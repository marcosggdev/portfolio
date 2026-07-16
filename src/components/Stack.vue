<script setup>
import { Icon } from "@iconify/vue";
import { StackValidator } from "../validation/ComponentValidators";

const props = defineProps({
  stack: { type: Array, required: true, validator: StackValidator },
  cols: { type: Number, default: -1 },
  rows: { type: Number, default: -1 },
  colorClass: { type: String, default: "text-white" },
});
</script>

<template>
  <ul
    class="w-fit h-fit grid gap-2 text-white"
    :style="`grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr)`"
  >
    <li
      v-for="tech in stack"
      class="flex flex-col items-center gap-1 aspect-square"
    >
      <Icon
        class="bg-icon aspect-square"
        :class="colorClass"
        :icon="tech.icon"
      />
      <span :class="colorClass">{{ tech.text }}</span>
    </li>
  </ul>
</template>
