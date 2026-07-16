<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  colorClass: { type: String, default: "text-white" },
  expanded: { type: Boolean, default: false },
});
</script>

<template>
  <ul class="flex flex-row items-center" :class="expanded ? 'gap-4' : 'gap-2'">
    <a
      class="hover:scale-[1.1] transition flex flex-row items-center gap-1"
      href="https://github.com/marcosggdev"
      target="_blank"
    >
      <Icon :class="colorClass" class="sm-icon" icon="simple-icons:github" />
      <span v-if="expanded" :class="colorClass">Github</span>
    </a>
    <a
      class="hover:scale-[1.1] transition flex flex-row items-center gap-1"
      href="https://www.linkedin.com/in/marcos-garcia-garcia-dev/"
      target="_blank"
      ><Icon :class="colorClass" class="sm-icon" icon="simple-icons:linkedin" />
      <span v-if="expanded" :class="colorClass">LinkedIn</span>
    </a>
  </ul>
</template>
