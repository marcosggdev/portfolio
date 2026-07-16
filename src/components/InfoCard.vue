<script setup>
import { Icon } from "@iconify/vue";
import { resolveCSSVar } from "../utils/resolveCSSVar";

const props = defineProps({
  icon: { type: String, required: false, default: "" },
  iconColor: { type: String, required: false, default: "--primary-color" },
  image: { type: String, required: false, default: "" },
  mediaSize: { type: String, required: false, default: "md-icon" },
  rounded: { type: String, required: false, default: "none" },
  alt: { type: String, default: "" },
  label: { type: String, required: false, default: "" },
  title: { type: String, required: true, default: "title" },
  text: { type: String, required: true, default: "lorem ipsum" },
});
</script>

<template>
  <div
    :style="{
      '--icon-color': resolveCSSVar(iconColor),
    }"
    class="grid grid-cols-[max-content_auto] items-start gap-4"
  >
    <div class="flex flex-col gap-2 justify-center items-center">
      <Icon
        v-if="icon"
        class="text-[var(--icon-color)] aspect-square"
        :class="[mediaSize, `rounded-${rounded}`]"
        :icon="icon"
      />
      <div
        v-else-if="image"
        class="aspect-square bg-cover bg-center bg-no-repeat"
        :class="[mediaSize, `rounded-${rounded}`]"
        :style="`background-image: url(${image})`"
      ></div>
      <span
        class="text-[var(--primary-color)] flex flex-row items-center justify-center p-2 pt-1 pb-1 rounded-full"
      >
        {{ label }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <h5 class="text-[var(--light-title)]">{{ title }}</h5>
      <p class="text-[var(--light-text)]">
        {{ text }}
      </p>
    </div>
  </div>
</template>
