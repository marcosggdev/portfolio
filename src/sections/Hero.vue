<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import Section from "../components/Section.vue";
import Button from "../components/Button.vue";

const props = defineProps({
  hasPadding: {
    type: Boolean,
    default: true,
  },

  backgroundImage: {
    type: String,
    default: "",
  },

  backgroundBrightness: {
    type: Number,
    default: 0.4,
  },

  /**
   * Puede ser:
   *
   * size="md"
   *
   * o responsive:
   *
   * :size="{
   *   base: 'bg',
   *   md: 'md',
   * }"
   */
  size: {
    type: [String, Object],
    default: "md",
  },
});

const isMd = ref(false);

let mediaQuery = null;
let mediaQueryListener = null;

const updateBreakpoint = () => {
  if (!mediaQuery) {
    return;
  }

  isMd.value = mediaQuery.matches;
};

const resolvedSize = computed(() => {
  if (typeof props.size === "string") {
    return props.size;
  }

  const baseSize = props.size?.base ?? "md";

  if (isMd.value) {
    return props.size?.md ?? baseSize;
  }

  return baseSize;
});

onMounted(() => {
  mediaQuery = window.matchMedia("(min-width: 768px)");

  updateBreakpoint();

  mediaQueryListener = () => {
    updateBreakpoint();
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", mediaQueryListener);
  } else {
    mediaQuery.addListener(mediaQueryListener);
  }
});

onBeforeUnmount(() => {
  if (!mediaQuery || !mediaQueryListener) {
    return;
  }

  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener("change", mediaQueryListener);
  } else {
    mediaQuery.removeListener(mediaQueryListener);
  }
});
</script>

<template>
  <Section
    class="text-white"
    :has-padding="hasPadding"
    :background-image="backgroundImage"
    :background-brightness="backgroundBrightness"
    :size="resolvedSize"
  >
    <div class="flex h-full w-full flex-row items-center justify-center">
      <div
        class="flex max-w-[1024px] flex-col items-center justify-center gap-8"
      >
        <slot>
          <h1>Título</h1>

          <h2>Subtítulo</h2>

          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            commodi consequuntur aspernatur vel excepturi.
          </h4>

          <div
            class="flex flex-row flex-wrap items-center justify-center gap-4"
          >
            <Button
              type="link"
              href="/proyectos"
              variant="secondary"
              :effects="['crystal']"
            >
              Ver Proyectos
            </Button>

            <Button
              action="downloadCV"
              variant="secondary"
              :effects="['crystal']"
              :show-action-success-message="true"
              :show-action-fail-message="true"
              action-success-message="CV descargado correctamente."
              action-fail-message="No se ha podido descargar el CV."
            >
              Descargar CV
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </Section>
</template>
