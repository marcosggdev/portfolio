<script setup>
import { Icon } from "@iconify/vue";
import Stack from "../components/Stack.vue";

import stack from "../data/Stack.json";
import ItemsScroll from "../components/ItemsScroll.vue";
</script>

<template>
  <div
    class="flex flex-col md:grid md:grid-cols-2 gap-16 p-8 pt-16 pb-16 md:p-16 md:pt-32 md:pb-32 justify-center relative h-screen items-center"
  >
    <div class="flex flex-col gap-2">
      <Stack :stack="stack" :cols="4" />
    </div>
    <div class="flex flex-col gap-8">
      <h3 class="text-[var(--primary-color)]">Formación y Stack</h3>
      <ItemsScroll />
    </div>
  </div>
</template>
