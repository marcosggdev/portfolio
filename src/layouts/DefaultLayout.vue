<script setup>
import Navbar from "../components/Navbar.vue";
import Nav from "../components/Nav.vue";
import { navbarThemeVariations } from "../theme/NavbarTheme";
import { navThemeVariations } from "../theme/NavTheme";
import Footer from "../sections/Footer.vue";
import Section from "../components/Section.vue";

import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <Nav v-bind="navThemeVariations[0]" class="fixed inset-0 w-full h-fit" />
  <router-view />
  <Footer />
</template>
