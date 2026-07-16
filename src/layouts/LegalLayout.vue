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
    class="flex flex-col gap-4 md:max-w-[1024px] ml-auto mr-auto p-8 pt-16 pb-16 md:p-16 md:pt-32 md:pb-32"
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
