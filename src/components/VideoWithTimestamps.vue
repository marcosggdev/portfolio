<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  srcDesktop: {
    type: String,
    default: "",
  },

  srcMobile: {
    type: String,
    default: "",
  },

  timestamps: {
    type: Array,
    default: () => [],
  },
});

const video = ref(null);
const timeline = ref(null);

const duration = ref(0);
const currentTime = ref(0);
const isPlaying = ref(false);

const activeTimestamp = ref(null);
const dismissedTimestamp = ref(null);

const isScrubbing = ref(false);

// Mobile controls visibility.
// Desktop visibility is controlled exclusively by group-hover.
const controlsVisible = ref(false);

// Timestamp navigation starts collapsed.
const timestampsExpanded = ref(false);

// Detect mobile/desktop.
const isMobile = ref(false);

let mediaQuery = null;
let mediaQueryListener = null;

let scrubFrame = null;
let pendingScrubTime = null;

const warnedTimestampErrors = new Set();

/**
 * Vídeo que debe utilizarse según el dispositivo.
 *
 * Mobile:
 *   srcMobile
 *
 * Desktop:
 *   srcDesktop
 *
 * Si uno de los dos no existe, utiliza el otro como fallback.
 */
const videoSrc = computed(() => {
  if (isMobile.value) {
    return props.srcMobile || props.srcDesktop;
  }

  return props.srcDesktop || props.srcMobile;
});

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const progress = computed(() => {
  if (!duration.value) {
    return 0;
  }

  return (currentTime.value / duration.value) * 100;
});

const rawTimestamps = computed(() =>
  props.timestamps.map((item, index) => ({
    id: item?.id ?? index,
    start: Number(item?.start ?? item?.time ?? 0),
    end: Number(item?.end ?? item?.start ?? item?.time ?? 0),
    title: item?.title ?? "",
    text: item?.text ?? "",
    data: item,
    index,
  })),
);

const getTimestampValidationError = (timestamp) => {
  if (!Number.isFinite(timestamp.start)) {
    return "el tiempo de inicio no es un número válido";
  }

  if (!Number.isFinite(timestamp.end)) {
    return "el tiempo de fin no es un número válido";
  }

  if (timestamp.start < 0) {
    return `el tiempo de inicio (${timestamp.start}s) es negativo`;
  }

  if (timestamp.end < 0) {
    return `el tiempo de fin (${timestamp.end}s) es negativo`;
  }

  if (timestamp.end < timestamp.start) {
    return `el tiempo de fin (${timestamp.end}s) es anterior al inicio (${timestamp.start}s)`;
  }

  if (duration.value > 0) {
    if (timestamp.start > duration.value) {
      return `el inicio (${timestamp.start}s) está fuera del vídeo, cuya duración es ${duration.value.toFixed(
        3,
      )}s`;
    }

    if (timestamp.end > duration.value) {
      return `el fin (${timestamp.end}s) está fuera del vídeo, cuya duración es ${duration.value.toFixed(
        3,
      )}s`;
    }
  }

  return null;
};

const validateTimestamps = () => {
  rawTimestamps.value.forEach((timestamp) => {
    const error = getTimestampValidationError(timestamp);

    if (!error) {
      return;
    }

    const isDurationError = error.includes("fuera del vídeo");

    if (isDurationError && !duration.value) {
      return;
    }

    const warningKey = [
      props.srcDesktop,
      props.srcMobile,
      timestamp.index,
      timestamp.start,
      timestamp.end,
      error,
    ].join("|");

    if (warnedTimestampErrors.has(warningKey)) {
      return;
    }

    warnedTimestampErrors.add(warningKey);

    console.warn(
      `[VideoTimeline] Timestamp inválido en el índice ${timestamp.index}: ${error}`,
      timestamp.data,
    );
  });
};

const normalizedTimestamps = computed(() => {
  if (!duration.value) {
    return [];
  }

  return rawTimestamps.value
    .filter((timestamp) => !getTimestampValidationError(timestamp))
    .sort((a, b) => a.start - b.start);
});

const getSegmentStyle = (timestamp) => {
  if (!duration.value) {
    return {};
  }

  const start = Math.max(0, timestamp.start);
  const end = Math.min(duration.value, timestamp.end);

  return {
    left: `${(start / duration.value) * 100}%`,
    width: `${Math.max(((end - start) / duration.value) * 100, 0.25)}%`,
  };
};

const getMarkerStyle = (timestamp) => {
  if (!duration.value) {
    return {};
  }

  return {
    left: `${(timestamp.start / duration.value) * 100}%`,
  };
};

/**
 * Cierra manualmente el timestamp activo.
 *
 * El timestamp queda descartado hasta que:
 * - el reproductor vuelva a cruzar su punto inicial, o
 * - el usuario haga seek/scrub manualmente.
 */
const closeActiveTimestamp = () => {
  dismissedTimestamp.value = activeTimestamp.value;
  activeTimestamp.value = null;
};

/**
 * Actualiza el timestamp activo durante la reproducción.
 *
 * Importante:
 * Un timestamp cerrado manualmente NO se vuelve a abrir mientras
 * el reproductor permanezca dentro de su intervalo.
 *
 * Solo se vuelve a abrir cuando el reproductor cruza de nuevo
 * su punto inicial.
 */
const updateActiveTimestamp = (previousTime = currentTime.value) => {
  const current = currentTime.value;

  const found = normalizedTimestamps.value.find(
    (timestamp) =>
      current >= timestamp.start &&
      current <= Math.max(timestamp.end, timestamp.start),
  );

  if (!found) {
    activeTimestamp.value = null;
    return;
  }

  const crossedStart = previousTime < found.start && current >= found.start;

  if (dismissedTimestamp.value === found.id && !crossedStart) {
    activeTimestamp.value = null;
    return;
  }

  if (crossedStart) {
    dismissedTimestamp.value = null;
  }

  activeTimestamp.value = found.id;
};

/**
 * Activa el timestamp correspondiente a una navegación manual.
 *
 * Un seek/scrub se considera una intención explícita del usuario,
 * por lo que elimina cualquier estado de cierre manual.
 */
const activateTimestampAtCurrentTime = () => {
  const current = currentTime.value;

  const found = normalizedTimestamps.value.find(
    (timestamp) =>
      current >= timestamp.start &&
      current <= Math.max(timestamp.end, timestamp.start),
  );

  dismissedTimestamp.value = null;
  activeTimestamp.value = found?.id ?? null;
};

const updateTime = () => {
  if (!video.value) {
    return;
  }

  const previousTime = currentTime.value;

  if (!isScrubbing.value) {
    currentTime.value = video.value.currentTime;
  }

  updateActiveTimestamp(previousTime);
};

const handleLoadedMetadata = () => {
  if (!video.value) {
    return;
  }

  duration.value = video.value.duration;
  currentTime.value = video.value.currentTime;

  validateTimestamps();

  updateActiveTimestamp();
};

const handlePlay = () => {
  isPlaying.value = true;
};

const handlePause = () => {
  isPlaying.value = false;
};

const handleEnded = () => {
  isPlaying.value = false;
};

const togglePlay = async () => {
  if (!video.value) {
    return;
  }

  if (video.value.paused) {
    try {
      await video.value.play();
    } catch (error) {
      isPlaying.value = false;

      console.warn("[VideoTimeline] No se pudo reproducir el vídeo.", error);
    }

    return;
  }

  video.value.pause();
  isPlaying.value = false;
};

const handleVideoClick = async () => {
  await togglePlay();

  // Relevant on mobile.
  // On desktop visibility is controlled by group-hover.
  controlsVisible.value = true;
};

const toggleTimestampNavigation = () => {
  timestampsExpanded.value = !timestampsExpanded.value;
  controlsVisible.value = true;
};

const getTimeFromClientX = (clientX) => {
  if (!timeline.value || !duration.value) {
    return null;
  }

  const rect = timeline.value.getBoundingClientRect();

  const position = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);

  return position * duration.value;
};

const seek = (event) => {
  if (!video.value || !duration.value || isScrubbing.value) {
    return;
  }

  const target = getTimeFromClientX(event.clientX);

  if (target === null) {
    return;
  }

  video.value.currentTime = target;
  currentTime.value = target;

  activateTimestampAtCurrentTime();
};

const startScrubbing = (event) => {
  if (!video.value || !duration.value) {
    return;
  }

  video.value.pause();
  isPlaying.value = false;
  isScrubbing.value = true;

  event.currentTarget.setPointerCapture(event.pointerId);

  seekFromPointer(event.clientX);
};

const handleScrubbing = (event) => {
  if (!isScrubbing.value) {
    return;
  }

  seekFromPointer(event.clientX);
};

const seekFromPointer = (clientX) => {
  const target = getTimeFromClientX(clientX);

  if (target === null) {
    return;
  }

  pendingScrubTime = target;

  if (scrubFrame !== null) {
    return;
  }

  scrubFrame = requestAnimationFrame(() => {
    scrubFrame = null;

    if (!isScrubbing.value || !video.value || pendingScrubTime === null) {
      return;
    }

    const targetTime = pendingScrubTime;

    pendingScrubTime = null;

    video.value.currentTime = targetTime;
    currentTime.value = targetTime;

    activateTimestampAtCurrentTime();
  });
};

const finishScrubbing = (event) => {
  if (!isScrubbing.value) {
    return;
  }

  if (video.value && pendingScrubTime !== null) {
    video.value.currentTime = pendingScrubTime;
    currentTime.value = pendingScrubTime;

    pendingScrubTime = null;

    activateTimestampAtCurrentTime();
  }

  if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  isScrubbing.value = false;

  if (video.value) {
    video.value.pause();
  }

  isPlaying.value = false;
};

const cancelScrubbing = (event) => {
  finishScrubbing(event);
};

const navigateTo = (timestamp) => {
  if (!video.value || !duration.value) {
    return;
  }

  const validationError = getTimestampValidationError(timestamp);

  if (validationError) {
    console.warn(
      `[VideoTimeline] No se puede navegar al timestamp ${timestamp.id}: ${validationError}`,
    );

    return;
  }

  const target = Math.min(Math.max(timestamp.start, 0), duration.value);

  video.value.currentTime = target;
  currentTime.value = target;

  activateTimestampAtCurrentTime();
};

const handleTimestampClick = (timestamp) => {
  navigateTo(timestamp);
  controlsVisible.value = true;
};

/**
 * Resetea el estado cuando cambia el vídeo.
 *
 * Esto se utiliza tanto cuando cambia srcDesktop/srcMobile
 * como cuando cambia el breakpoint y, por tanto, cambia
 * videoSrc.
 */
const resetVideoState = () => {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = 0;
  }

  currentTime.value = 0;
  duration.value = 0;

  activeTimestamp.value = null;
  dismissedTimestamp.value = null;

  isPlaying.value = false;
  controlsVisible.value = false;
  timestampsExpanded.value = false;

  isScrubbing.value = false;
  pendingScrubTime = null;

  if (scrubFrame !== null) {
    cancelAnimationFrame(scrubFrame);
    scrubFrame = null;
  }
};

/**
 * Detecta mobile / desktop y actualiza el vídeo cuando
 * cambia el breakpoint.
 */
onMounted(() => {
  mediaQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mediaQuery.matches;

  mediaQueryListener = (event) => {
    isMobile.value = event.matches;
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", mediaQueryListener);
  } else {
    mediaQuery.addListener(mediaQueryListener);
  }
});

/**
 * Valida timestamps cuando cambian o cuando cambia
 * la duración del vídeo.
 */
watch(
  [() => props.timestamps, () => duration.value],
  () => {
    validateTimestamps();
  },
  {
    deep: true,
  },
);

/**
 * Un único watcher para el vídeo efectivo.
 *
 * Se ejecuta cuando:
 * - cambia srcDesktop
 * - cambia srcMobile
 * - cambia de desktop a mobile
 * - cambia de mobile a desktop
 */
watch(videoSrc, (newSrc, oldSrc) => {
  if (newSrc === oldSrc) {
    return;
  }

  resetVideoState();
});

onBeforeUnmount(() => {
  if (scrubFrame !== null) {
    cancelAnimationFrame(scrubFrame);
    scrubFrame = null;
  }

  pendingScrubTime = null;

  if (mediaQuery) {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", mediaQueryListener);
    } else {
      mediaQuery.removeListener(mediaQueryListener);
    }
  }
});
</script>

<template>
  <div
    class="group relative w-full aspect-[9/16] md:aspect-video overflow-hidden"
  >
    <!-- VIDEO -->
    <video
      ref="video"
      :src="videoSrc"
      class="z-1 block w-full h-full object-cover cursor-pointer"
      @click="handleVideoClick"
      @loadedmetadata="handleLoadedMetadata"
      @timeupdate="updateTime"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
    />

    <!-- CONTROLS -->
    <div
      class="video-controls absolute inset-0 z-2 flex flex-col pointer-events-none opacity-0 transition-opacity duration-200 md:group-hover:opacity-100"
      :class="{ 'is-visible': controlsVisible }"
    >
      <!-- ACTIVE TIMESTAMP -->
      <div class="flex-1 flex items-start justify-end p-4 pointer-events-none">
        <div
          v-if="activeTimestamp !== null"
          class="relative max-w-xl md:w-[40%] px-4 py-2 pr-9 rounded-lg bg-black/60 backdrop-blur-sm text-white text-center pointer-events-auto"
        >
          <!-- CLOSE -->
          <button
            type="button"
            class="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar"
            title="Cerrar"
            @click.stop="closeActiveTimestamp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="w-3 h-3"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <template
            v-for="timestamp in normalizedTimestamps"
            :key="timestamp.id"
          >
            <div v-if="timestamp.id === activeTimestamp">
              <div v-if="timestamp.title" class="font-medium">
                {{ timestamp.title }}
              </div>

              <div v-if="timestamp.text" class="text-sm text-white/80">
                {{ timestamp.text }}
              </div>
            </div>
          </template>
        </div>
      </div>

      <!-- BOTTOM CONTROLS -->
      <div
        class="w-full px-4 pb-4 pt-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto"
        @click.stop
      >
        <!-- TIMELINE -->
        <div
          ref="timeline"
          class="relative h-2 w-full rounded-full bg-white/20 cursor-pointer touch-none select-none"
          @click.stop="seek"
          @pointerdown.stop="startScrubbing"
          @pointermove.stop="handleScrubbing"
          @pointerup.stop="finishScrubbing"
          @pointercancel.stop="cancelScrubbing"
          @pointerleave.stop="cancelScrubbing"
        >
          <!-- PROGRESS -->
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-white pointer-events-none"
            :style="{
              width: `${progress}%`,
            }"
          />

          <!-- TIMESTAMP SEGMENTS -->
          <div
            v-for="timestamp in normalizedTimestamps"
            :key="`segment-${timestamp.id}`"
            class="absolute inset-y-0 rounded-full bg-white/30 pointer-events-none"
            :style="getSegmentStyle(timestamp)"
          />

          <!-- TIMESTAMP MARKERS -->
          <div
            v-for="timestamp in normalizedTimestamps"
            :key="`marker-${timestamp.id}`"
            class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-black/30 pointer-events-none"
            :style="getMarkerStyle(timestamp)"
          />

          <!-- CURRENT POSITION -->
          <div
            class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow pointer-events-none"
            :style="{
              left: `${progress}%`,
            }"
          />
        </div>

        <!-- PLAYBACK ROW -->
        <div class="flex items-center gap-2 mt-2 text-white">
          <!-- PLAY / PAUSE -->
          <button
            type="button"
            class="flex items-center justify-center w-8 h-8 shrink-0 rounded text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
            :aria-label="isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'"
            @click.stop="togglePlay"
          >
            <!-- PAUSE -->
            <svg
              v-if="isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>

            <!-- PLAY -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <!-- CURRENT TIME -->
          <span class="text-sm tabular-nums whitespace-nowrap text-white/90">
            {{ formatTime(currentTime) }}
            /
            {{ formatTime(duration) }}
          </span>

          <!-- SPACER -->
          <div class="flex-1" />

          <!-- TIMESTAMP TOGGLE -->
          <button
            v-if="normalizedTimestamps.length"
            type="button"
            class="flex items-center justify-center w-8 h-8 shrink-0 rounded text-white/90 hover:bg-white/10 transition-colors cursor-pointer"
            :aria-label="
              timestampsExpanded ? 'Ocultar timestamps' : 'Mostrar timestamps'
            "
            :aria-expanded="timestampsExpanded"
            :title="
              timestampsExpanded ? 'Ocultar timestamps' : 'Mostrar timestamps'
            "
            @click.stop="toggleTimestampNavigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="w-5 h-5 transition-transform duration-200"
              :class="{
                'rotate-180': timestampsExpanded,
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <!-- TIMESTAMP NAVIGATION -->
        <div
          v-if="normalizedTimestamps.length"
          class="overflow-hidden transition-[height] duration-200 ease-in-out"
          :class="timestampsExpanded ? 'h-[68px]' : 'h-0'"
        >
          <div
            class="flex gap-2 overflow-x-auto overscroll-contain pt-3 pb-1 scrollbar-thin"
          >
            <button
              v-for="timestamp in normalizedTimestamps"
              :key="timestamp.id"
              type="button"
              class="shrink-0 max-w-[220px] px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-left transition-colors cursor-pointer"
              :class="{
                'bg-blue-500/70': timestamp.id === activeTimestamp,
              }"
              @click.stop="handleTimestampClick(timestamp)"
            >
              <div class="text-xs text-white/60 whitespace-nowrap">
                {{ formatTime(timestamp.start) }}

                <template v-if="timestamp.end !== timestamp.start">
                  —
                  {{ formatTime(timestamp.end) }}
                </template>
              </div>

              <div
                v-if="timestamp.title"
                class="text-sm font-medium text-white truncate"
              >
                {{ timestamp.title }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
 * Desktop:
 *   Visibility is controlled by md:group-hover:opacity-100.
 *
 * Mobile:
 *   There is no reliable hover, so controlsVisible controls
 *   the opacity explicitly.
 */
@media (max-width: 767px) {
  .video-controls {
    opacity: 0;
  }

  .video-controls.is-visible {
    opacity: 1;
  }
}
</style>
