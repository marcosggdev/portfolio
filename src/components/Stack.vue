<script setup>
import { Icon } from "@iconify/vue";
import { StackValidator } from "../validation/ComponentValidators";

const props = defineProps({
  stack: { type: Array, required: true, validator: StackValidator },
  colorClass: { type: String, default: "text-white" },
});
</script>

<template>
  <ul
    class="w-fit h-fit gap-2 text-white m-auto grid grid grid-cols-3 md:grid md:grid-cols-4"
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
