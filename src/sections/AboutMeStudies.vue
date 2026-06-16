<script setup>
import { Icon } from "@iconify/vue";
import Stack from "../components/Stack.vue";

import stack from "../data/Stack.json";
import ItemsScroll from "../components/ItemsScroll.vue";
</script>

<template>
  <div
    class="grid grid-cols-2 gap-16 p-16 pt-32 pb-32 justify-center relative h-screen items-center"
  >
    <div class="flex flex-col gap-2">
      <Stack :stack="stack" :cols="4" />
    </div>
    <div class="flex flex-col gap-8">
      <h3 class="text-[var(--light-title)]">Formación y Stack</h3>
      <ItemsScroll />
    </div>
  </div>
</template>
