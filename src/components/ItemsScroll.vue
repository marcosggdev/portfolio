<script setup>
import { Icon } from "@iconify/vue";
import InfoCard from "./InfoCard.vue";
import studies from "../data/Studies.json";
</script>

<template>
  <div class="flex flex-col-reverse gap-8 overflow-y-scroll max-h-[60vh]">
    <InfoCard v-for="study in studies" v-bind="study" />
  </div>
</template>
