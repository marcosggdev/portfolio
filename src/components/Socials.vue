<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <ul class="flex flex-row items-center gap-2">
    <a
      class="hover:scale-[1.1] transition"
      href="https://github.com/marcosggdev"
      target="_blank"
      ><Icon class="sm-icon text-white" icon="simple-icons:github"
    /></a>
    <a
      class="hover:scale-[1.1] transition"
      href="https://www.linkedin.com/in/marcos-garcia-garcia-dev/"
      target="_blank"
      ><Icon class="sm-icon text-white" icon="simple-icons:linkedin"
    /></a>
    <a
      class="hover:scale-[1.1] transition"
      href="mailto:marcosggdev@gmail.com"
      target="_blank"
      ><Icon class="sm-icon text-white" icon="simple-icons:gmail"
    /></a>
  </ul>
</template>
