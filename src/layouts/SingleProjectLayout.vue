<script setup>
import Projects from "../data/Projects";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const project = computed(() => Projects[route.params.slug]);
const Component = computed(() => project.value?.component);
</script>

<template>
  <component :is="Component" :project="project"></component>
</template>
