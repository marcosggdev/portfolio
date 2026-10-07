<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

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
    default: 1,
  },

  size: {
    type: [String, Object],
    default: "md",
    validator: (value) => {
      if (typeof value === "string") {
        return ["sm", "md", "bg"].includes(value);
      }

      if (typeof value === "object" && value !== null) {
        const validSizes = ["sm", "md", "bg"];
        const validBreakpoints = ["base", "sm", "md", "lg", "xl"];

        return Object.entries(value).every(
          ([breakpoint, size]) =>
            validBreakpoints.includes(breakpoint) && validSizes.includes(size),
        );
      }

      return false;
    },
  },
});

const isSm = ref(false);
const isMd = ref(false);
const isLg = ref(false);
const isXl = ref(false);

let mediaQueries = [];

const updateBreakpoints = () => {
  isSm.value = mediaQueries[0]?.matches ?? false;
  isMd.value = mediaQueries[1]?.matches ?? false;
  isLg.value = mediaQueries[2]?.matches ?? false;
  isXl.value = mediaQueries[3]?.matches ?? false;
};

const resolvedSizeName = computed(() => {
  if (typeof props.size === "string") {
    return props.size;
  }

  const sizes = props.size ?? {};

  let resolved = sizes.base ?? "md";

  if (isSm.value && sizes.sm) {
    resolved = sizes.sm;
  }

  if (isMd.value && sizes.md) {
    resolved = sizes.md;
  }

  if (isLg.value && sizes.lg) {
    resolved = sizes.lg;
  }

  if (isXl.value && sizes.xl) {
    resolved = sizes.xl;
  }

  return resolved;
});

const size = computed(() => {
  switch (resolvedSizeName.value) {
    case "sm":
      return "min-h-[30vh]";

    case "md":
      return "min-h-[50vh] md:min-h-[70vh]";

    case "bg":
      return "min-h-[100vh]";

    default:
      return "min-h-[50vh] md:min-h-[70vh]";
  }
});

const padding = computed(() =>
  props.hasPadding ? "p-4 pt-16 pb-16 md:p-16 md:pt-32 md:pb-32" : "",
);

onMounted(() => {
  mediaQueries = [
    window.matchMedia("(min-width: 640px)"),
    window.matchMedia("(min-width: 768px)"),
    window.matchMedia("(min-width: 1024px)"),
    window.matchMedia("(min-width: 1280px)"),
  ];

  updateBreakpoints();

  mediaQueries.forEach((mediaQuery) => {
    mediaQuery.addEventListener("change", updateBreakpoints);
  });
});

onBeforeUnmount(() => {
  mediaQueries.forEach((mediaQuery) => {
    mediaQuery.removeEventListener("change", updateBreakpoints);
  });

  mediaQueries = [];
});
</script>

<template>
  <section :class="[padding, size]" class="relative">
    <slot />

    <div
      class="absolute inset-0 w-full h-full -z-1 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        filter: `brightness(${backgroundBrightness})`,
      }"
    />
  </section>
</template>
