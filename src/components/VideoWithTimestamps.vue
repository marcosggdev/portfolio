<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

const props = defineProps({
  srcDesktop: {
    type: String,
    default: "",
  },
  srcMobile: {
    type: String,
    default: "",
  },
  posterDesktop: {
    type: String,
    default: "",
  },
  posterMobile: {
    type: String,
    default: "",
  },
  timestamps: {
    type: Object,
    default: () => ({
      desktop: [],
      mobile: [],
    }),
  },
});

const video = ref(null);
const videoContainer = ref(null);
const timeline = ref(null);

const duration = ref(0);
const currentTime = ref(0);
const isPlaying = ref(false);

const activeTimestamp = ref(null);
const dismissedTimestamp = ref(null);

const isScrubbing = ref(false);

// Estados de carga.
const isLoading = ref(true);
const isBuffering = ref(false);
const isReady = ref(false);
const hasError = ref(false);

// Indicador Play para móvil.
const mobilePlayHintVisible = ref(false);
const mobilePlayHintDismissed = ref(false);

// Lazy loading.
const shouldLoadVideo = ref(false);

let videoObserver = null;
let hasEnteredViewport = false;
let loadRequested = false;

// Controles.
const controlsVisible = ref(false);
const timestampsExpanded = ref(false);

// Detección de dispositivo.
const isMobile = ref(false);

let mediaQuery = null;
let mediaQueryListener = null;

// Scrubbing.
let scrubFrame = null;
let pendingScrubTime = null;

// Evita repetir avisos de timestamps inválidos.
const warnedTimestampErrors = new Set();

/**
 * Fuente de vídeo según el dispositivo.
 */
const videoSrc = computed(() => {
  if (isMobile.value) {
    return props.srcMobile || props.srcDesktop;
  }

  return props.srcDesktop || props.srcMobile;
});

/**
 * Poster según el dispositivo.
 */
const posterSrc = computed(() => {
  if (isMobile.value) {
    return props.posterMobile || props.posterDesktop;
  }

  return props.posterDesktop || props.posterMobile;
});

/**
 * Timestamps según el dispositivo.
 *
 * Si no existe una lista para el dispositivo actual,
 * utiliza la del otro dispositivo como fallback.
 */
const deviceTimestamps = computed(() => {
  if (isMobile.value) {
    return props.timestamps?.mobile ?? props.timestamps?.desktop ?? [];
  }

  return props.timestamps?.desktop ?? props.timestamps?.mobile ?? [];
});

/**
 * La fuente solo se asigna después de activar el lazy loading.
 */
const lazyVideoSrc = computed(() =>
  shouldLoadVideo.value ? videoSrc.value || undefined : undefined,
);

/**
 * El indicador Play solo aparece en móvil cuando el vídeo está listo,
 * no se está reproduciendo y el usuario todavía no lo ha descartado.
 */
const showMobilePlayHint = computed(
  () =>
    isMobile.value &&
    isReady.value &&
    !isPlaying.value &&
    !isLoading.value &&
    !isBuffering.value &&
    !hasError.value &&
    !mobilePlayHintDismissed.value &&
    mobilePlayHintVisible.value,
);

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

/**
 * Normaliza los timestamps seleccionados para el dispositivo actual.
 */
const rawTimestamps = computed(() =>
  deviceTimestamps.value.map((item, index) => ({
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
    return `el tiempo de fin (${timestamp.end}s) es anterior al inicio`;
  }

  if (duration.value > 0) {
    if (timestamp.start > duration.value) {
      return `el inicio (${timestamp.start}s) está fuera del vídeo, cuya duración es ${duration.value.toFixed(3)}s`;
    }

    if (timestamp.end > duration.value) {
      return `el fin (${timestamp.end}s) está fuera del vídeo, cuya duración es ${duration.value.toFixed(3)}s`;
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
      isMobile.value ? "mobile" : "desktop",
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

/**
 * Solo devuelve timestamps válidos para la duración del vídeo actual.
 */
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
 * Solicita la carga del vídeo.
 */
const loadVideo = async () => {
  if (loadRequested || !videoSrc.value) {
    return;
  }

  loadRequested = true;
  shouldLoadVideo.value = true;

  isLoading.value = true;
  hasError.value = false;

  await nextTick();

  const element = video.value;

  if (!element || !element.getAttribute("src")) {
    loadRequested = false;
    return;
  }

  if (element.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    handleCanPlay();
    return;
  }

  element.load();
};

/**
 * Cierra manualmente el timestamp activo.
 */
const closeActiveTimestamp = () => {
  dismissedTimestamp.value = activeTimestamp.value;
  activeTimestamp.value = null;
};

/**
 * Actualiza el timestamp activo durante la reproducción.
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

/**
 * Los metadatos están disponibles.
 */
const handleLoadedMetadata = () => {
  if (!video.value) {
    return;
  }

  duration.value = Number.isFinite(video.value.duration)
    ? video.value.duration
    : 0;

  currentTime.value = video.value.currentTime;

  validateTimestamps();
  updateActiveTimestamp();
};

/**
 * Comienza una nueva carga.
 */
const handleLoadStart = () => {
  hasError.value = false;
  isBuffering.value = false;

  if (!isReady.value) {
    isLoading.value = true;
  }
};

/**
 * El vídeo dispone de datos suficientes para reproducirse.
 */
const handleCanPlay = () => {
  isLoading.value = false;
  isBuffering.value = false;
  isReady.value = true;
  hasError.value = false;

  if (isMobile.value && !mobilePlayHintDismissed.value) {
    mobilePlayHintVisible.value = true;
  }
};

/**
 * El primer fotograma está disponible.
 */
const handleLoadedData = () => {
  if (video.value?.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    isLoading.value = false;
    isReady.value = true;
    hasError.value = false;

    if (isMobile.value && !mobilePlayHintDismissed.value) {
      mobilePlayHintVisible.value = true;
    }
  }
};

/**
 * El vídeo está esperando datos durante la reproducción.
 */
const handleWaiting = () => {
  if (hasError.value || !video.value) {
    return;
  }

  if (!isReady.value) {
    isLoading.value = true;
    return;
  }

  if (!video.value.paused && !video.value.ended) {
    isBuffering.value = true;
  }
};

/**
 * La reproducción ha comenzado o se ha reanudado.
 */
const handlePlaying = () => {
  isLoading.value = false;
  isBuffering.value = false;
  isReady.value = true;
  hasError.value = false;

  mobilePlayHintVisible.value = false;
  mobilePlayHintDismissed.value = true;
};

/**
 * Error de carga o reproducción.
 */
const handleVideoError = () => {
  if (!video.value?.currentSrc && !lazyVideoSrc.value) {
    return;
  }

  isLoading.value = false;
  isBuffering.value = false;
  isReady.value = false;
  hasError.value = true;
  isPlaying.value = false;
  mobilePlayHintVisible.value = false;

  console.warn(
    "[VideoTimeline] No se pudo cargar el vídeo.",
    video.value?.error,
  );
};

const handlePlay = () => {
  isPlaying.value = true;
  mobilePlayHintVisible.value = false;
  mobilePlayHintDismissed.value = true;
};

const handlePause = () => {
  isPlaying.value = false;
  isBuffering.value = false;
};

const handleEnded = () => {
  isPlaying.value = false;
  isBuffering.value = false;

  // No volvemos a mostrar el indicador al terminar el vídeo.
  mobilePlayHintVisible.value = false;
  mobilePlayHintDismissed.value = true;
};

/**
 * Reproduce o pausa el vídeo.
 */
const togglePlay = async () => {
  if (!video.value || hasError.value) {
    return;
  }

  if (video.value.paused) {
    mobilePlayHintVisible.value = false;
    mobilePlayHintDismissed.value = true;

    if (!shouldLoadVideo.value) {
      await loadVideo();
      await nextTick();
    }

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
  controlsVisible.value = true;
};

/**
 * El indicador Play móvil inicia la reproducción.
 */
const handleMobilePlayClick = async (event) => {
  event.stopPropagation();

  mobilePlayHintVisible.value = false;
  mobilePlayHintDismissed.value = true;
  controlsVisible.value = true;

  await togglePlay();
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
  if (!video.value || !duration.value || isScrubbing.value || hasError.value) {
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
  if (!video.value || !duration.value || hasError.value) {
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
  }

  if (scrubFrame !== null) {
    cancelAnimationFrame(scrubFrame);
    scrubFrame = null;
  }

  activateTimestampAtCurrentTime();

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
  if (!video.value || !duration.value || hasError.value) {
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
 * Reinicia el estado cuando cambia la fuente efectiva.
 */
const resetVideoState = () => {
  if (video.value) {
    video.value.pause();

    try {
      video.value.currentTime = 0;
    } catch {
      // Puede que todavía no haya metadatos.
    }
  }

  currentTime.value = 0;
  duration.value = 0;

  activeTimestamp.value = null;
  dismissedTimestamp.value = null;

  isPlaying.value = false;
  isLoading.value = true;
  isBuffering.value = false;
  isReady.value = false;
  hasError.value = false;

  mobilePlayHintVisible.value = false;
  mobilePlayHintDismissed.value = false;

  controlsVisible.value = false;
  timestampsExpanded.value = false;

  isScrubbing.value = false;
  pendingScrubTime = null;

  if (scrubFrame !== null) {
    cancelAnimationFrame(scrubFrame);
    scrubFrame = null;
  }

  loadRequested = false;
};

/**
 * Si cambia la fuente, solicita la carga cuando corresponda.
 */
watch(videoSrc, async (newSrc, oldSrc) => {
  if (newSrc === oldSrc) {
    return;
  }

  resetVideoState();

  if (hasEnteredViewport && newSrc) {
    shouldLoadVideo.value = true;

    await nextTick();

    if (video.value) {
      loadRequested = true;
      video.value.load();
    }
  }
});

/**
 * Al cambiar de dispositivo:
 * - Se selecciona la lista de timestamps correspondiente.
 * - Se reinicia el timestamp activo.
 * - Se reinicia el timestamp descartado.
 * - Se actualiza el indicador Play móvil.
 */
watch(isMobile, (mobile) => {
  activeTimestamp.value = null;
  dismissedTimestamp.value = null;

  if (!mobile) {
    mobilePlayHintVisible.value = false;
    return;
  }

  if (isReady.value && !mobilePlayHintDismissed.value) {
    mobilePlayHintVisible.value = true;
  }

  validateTimestamps();
});

/**
 * Detección de breakpoint y lazy loading.
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

  if ("IntersectionObserver" in window && videoContainer.value) {
    videoObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting && !hasEnteredViewport) {
          hasEnteredViewport = true;

          loadVideo();

          videoObserver?.disconnect();
          videoObserver = null;
        }
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    videoObserver.observe(videoContainer.value);
  } else {
    hasEnteredViewport = true;
    loadVideo();
  }
});

/**
 * Validación de timestamps.
 *
 * Se ejecuta al cambiar la lista seleccionada o la duración.
 */
watch(
  [deviceTimestamps, () => duration.value],
  () => {
    validateTimestamps();
  },
  {
    deep: true,
  },
);

onBeforeUnmount(() => {
  videoObserver?.disconnect();
  videoObserver = null;

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
    ref="videoContainer"
    class="group relative aspect-[9/16] w-full overflow-hidden bg-black md:aspect-video"
  >
    <!-- POSTER RESPONSIVE -->
    <img
      v-if="posterSrc && (!isReady || hasError)"
      :src="posterSrc"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
    />

    <!-- VIDEO -->
    <video
      ref="video"
      :src="lazyVideoSrc"
      :poster="posterSrc || undefined"
      preload="none"
      playsinline
      class="relative z-[1] block h-full w-full cursor-pointer bg-transparent object-cover"
      @click="handleVideoClick"
      @loadstart="handleLoadStart"
      @loadedmetadata="handleLoadedMetadata"
      @loadeddata="handleLoadedData"
      @canplay="handleCanPlay"
      @waiting="handleWaiting"
      @playing="handlePlaying"
      @error="handleVideoError"
      @timeupdate="updateTime"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
    />

    <!-- INDICADOR PLAY PARA MÓVIL -->
    <Transition name="mobile-play">
      <button
        v-if="showMobilePlayHint"
        type="button"
        class="mobile-play-hint absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white shadow-lg backdrop-blur-sm"
        aria-label="Reproducir vídeo"
        title="Reproducir vídeo"
        @click="handleMobilePlayClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="ml-1 h-7 w-7"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </Transition>

    <!-- ESTADO DE CARGA INICIAL -->
    <div
      v-if="shouldLoadVideo && isLoading && !hasError"
      class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/20"
      role="status"
      aria-live="polite"
    >
      <div
        class="flex flex-col items-center gap-3 rounded-xl bg-black/60 px-5 py-4 text-white backdrop-blur-sm"
      >
        <svg
          class="h-7 w-7 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>

        <span class="text-sm">Cargando vídeo…</span>
      </div>
    </div>

    <!-- ESTADO DE BUFFERING -->
    <div
      v-if="isBuffering && !hasError"
      class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div class="rounded-full bg-black/60 p-3 text-white backdrop-blur-sm">
        <svg
          class="h-7 w-7 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    </div>

    <!-- ESTADO DE ERROR -->
    <div
      v-if="hasError"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-4"
      role="alert"
    >
      <div
        class="flex max-w-xs flex-col items-center gap-3 text-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          class="h-8 w-8"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v4m0 4h.01M10.3 3.86 1.82 18.5A2 2 0 003.55 21h16.9a2 2 0 001.73-2.5L13.7 3.86a2 2 0 00-3.4 0z"
          />
        </svg>

        <p class="text-sm">No se ha podido cargar el vídeo.</p>
      </div>
    </div>

    <!-- CONTROLES -->
    <div
      class="video-controls pointer-events-none absolute inset-0 z-20 flex flex-col opacity-0 transition-opacity duration-200 md:group-hover:opacity-100"
      :class="{ 'is-visible': controlsVisible }"
    >
      <!-- TIMESTAMP ACTIVO -->
      <div class="pointer-events-none flex flex-1 items-start justify-end p-4">
        <div
          v-if="activeTimestamp !== null"
          class="pointer-events-auto relative max-w-xl rounded-lg bg-black/60 px-4 py-2 pr-9 text-center text-white backdrop-blur-sm md:w-[40%]"
        >
          <!-- CERRAR -->
          <button
            type="button"
            class="absolute right-1.5 top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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
              class="h-3 w-3"
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

      <!-- CONTROLES INFERIORES -->
      <div
        class="pointer-events-auto w-full bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-8"
        @click.stop
      >
        <!-- TIMELINE -->
        <div
          ref="timeline"
          class="relative h-2 w-full cursor-pointer touch-none select-none rounded-full bg-white/20"
          @click.stop="seek"
          @pointerdown.stop="startScrubbing"
          @pointermove.stop="handleScrubbing"
          @pointerup.stop="finishScrubbing"
          @pointercancel.stop="cancelScrubbing"
          @pointerleave.stop="cancelScrubbing"
        >
          <!-- PROGRESO -->
          <div
            class="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-white"
            :style="{ width: `${progress}%` }"
          />

          <!-- SEGMENTOS DE TIMESTAMPS -->
          <div
            v-for="timestamp in normalizedTimestamps"
            :key="`segment-${timestamp.id}`"
            class="pointer-events-none absolute inset-y-0 rounded-full bg-white/30"
            :style="getSegmentStyle(timestamp)"
          />

          <!-- MARCADORES DE TIMESTAMPS -->
          <div
            v-for="timestamp in normalizedTimestamps"
            :key="`marker-${timestamp.id}`"
            class="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/30 bg-white"
            :style="getMarkerStyle(timestamp)"
          />

          <!-- POSICIÓN ACTUAL -->
          <div
            class="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
            :style="{ left: `${progress}%` }"
          />
        </div>

        <!-- FILA DE REPRODUCCIÓN -->
        <div class="mt-2 flex items-center gap-2 text-white">
          <!-- PLAY / PAUSE -->
          <button
            type="button"
            class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded text-white/90 transition-colors hover:bg-white/10"
            :aria-label="isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'"
            :disabled="hasError"
            @click.stop="togglePlay"
          >
            <svg
              v-if="isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <!-- TIEMPO ACTUAL -->
          <span class="whitespace-nowrap text-sm tabular-nums text-white/90">
            {{ formatTime(currentTime) }}
            /
            {{ formatTime(duration) }}
          </span>

          <!-- ESPACIADOR -->
          <div class="flex-1" />

          <!-- MOSTRAR / OCULTAR TIMESTAMPS -->
          <button
            v-if="normalizedTimestamps.length"
            type="button"
            class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded text-white/90 transition-colors hover:bg-white/10"
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
              class="h-5 w-5 transition-transform duration-200"
              :class="{ 'rotate-180': timestampsExpanded }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <!-- NAVEGACIÓN DE TIMESTAMPS -->
        <div
          v-if="normalizedTimestamps.length"
          class="overflow-hidden transition-[height] duration-200 ease-in-out"
          :class="timestampsExpanded ? 'h-[68px]' : 'h-0'"
        >
          <div
            class="scrollbar-thin flex gap-2 overflow-x-auto overscroll-contain pb-1 pt-3"
          >
            <button
              v-for="timestamp in normalizedTimestamps"
              :key="timestamp.id"
              type="button"
              class="max-w-[220px] shrink-0 cursor-pointer rounded bg-white/10 px-3 py-2 text-left transition-colors hover:bg-white/20"
              :class="{
                'bg-blue-500/70': timestamp.id === activeTimestamp,
              }"
              @click.stop="handleTimestampClick(timestamp)"
            >
              <div class="whitespace-nowrap text-xs text-white/60">
                {{ formatTime(timestamp.start) }}

                <template v-if="timestamp.end !== timestamp.start">
                  —
                  {{ formatTime(timestamp.end) }}
                </template>
              </div>

              <div
                v-if="timestamp.title"
                class="truncate text-sm font-medium text-white"
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
 * Indicador Play para móvil.
 */
.mobile-play-hint {
  animation: mobile-play-pulse 1.6s ease-in-out infinite;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.mobile-play-enter-active,
.mobile-play-leave-active {
  transition:
    opacity 220ms ease,
    scale 220ms ease;
}

.mobile-play-enter-from,
.mobile-play-leave-to {
  opacity: 0;
  scale: 0.7;
}

@keyframes mobile-play-pulse {
  0%,
  100% {
    scale: 1;
  }

  50% {
    scale: 1.1;
  }
}

/*
 * Escritorio:
 * Los controles aparecen con group-hover.
 *
 * Móvil:
 * La visibilidad se controla mediante controlsVisible.
 */
@media (max-width: 767px) {
  .video-controls {
    opacity: 0;
  }

  .video-controls.is-visible {
    opacity: 1;
  }
}

/*
 * Respeta las preferencias de movimiento reducido.
 */
@media (prefers-reduced-motion: reduce) {
  .video-controls,
  .mobile-play-hint,
  .mobile-play-enter-active,
  .mobile-play-leave-active {
    animation: none;
    transition: none;
  }
}
</style>
