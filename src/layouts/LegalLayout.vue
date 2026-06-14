<script setup>
import Navbar from "../components/Navbar.vue";
import Nav from "../components/Nav.vue";
import { navbarThemeVariations } from "../theme/NavbarTheme";
import { navThemeVariations } from "../theme/NavTheme";
import Footer from "../sections/Footer.vue";
</script>

<template>
  <Nav :fixed="true" v-bind="navThemeVariations[0]" />

  <div
    class="flex flex-col gap-4 max-w-[1024px] ml-auto mr-auto p-16 pt-32 pb-32"
  >
    <Navbar
      class="flex flex-row items-center gap-2 p-2"
      group="legal"
      v-bind="navbarThemeVariations[0]"
    />

    <router-view />
  </div>

  <Footer />
</template>
