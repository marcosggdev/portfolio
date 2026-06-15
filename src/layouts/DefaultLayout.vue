<script setup>
import Nav from "../components/Nav.vue";
import { navThemeVariations } from "../theme/NavTheme";
import Footer from "../sections/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Nav v-bind="navThemeVariations[0]" class="fixed inset-0 w-full h-fit" />
  <RouterView />
  <Footer />
</template>
