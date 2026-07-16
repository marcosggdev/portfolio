<script setup>
import { computed } from "vue";

const props = defineProps({
  hasPadding: { type: Boolean, default: true },
  backgroundImage: { type: String, default: "" },
  backgroundBrightness: { type: Number, default: 1 },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "bg"].includes(value),
  },
});

const size = computed(() => {
  switch (props.size) {
    case "sm":
      return "min-h-[30vh]";
    case "md":
      return "min-h-[70vh]";
    case "bg":
      return "min-h-[100vh]";
  }
});
const padding = computed(() =>
  props.hasPadding ? "p-8 pt-16 pb-16 md:p-16 md:pt-32 md:pb-32" : "",
);
</script>

<template>
  <section :class="[padding, size]" class="relative">
    <slot></slot>
    <div
      class="absolute inset-0 w-full h-full -z-1 bg-cover bg-center bg-no-repeat"
      :style="`background-image: url(${backgroundImage}); filter: brightness(${backgroundBrightness})`"
    ></div>
  </section>
</template>
