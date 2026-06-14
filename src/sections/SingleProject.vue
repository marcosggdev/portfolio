<script setup>
import { Icon } from "@iconify/vue";
import fallback from "../assets/img/fallback.png";

const props = defineProps({
  src: { type: String, default: fallback },
  title: { type: String, default: "Title" },
  description: { type: String, default: "Description" },
  href: { type: String, default: "#" },
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <img :src="src" alt="" />
    <div class="grid grid-cols-[max-content_auto] gap-4 pb-32">
      <img class="e-bg-icon" :src="src" alt="" />
      <div class="flex flex-col">
        <h2>{{ title }}</h2>
        <a class="flex flex-row items-center gap-1" :href="href"
          ><Icon
            class="sm-icon"
            icon="mdi:open-in-new"
            target="_blank"
          />Visitar
        </a>
        <p>{{ description }}</p>
      </div>
    </div>
    <slot> </slot>
  </div>
</template>
