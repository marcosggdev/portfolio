<script setup>
import Hero from "../sections/Hero.vue";
import Socials from "../components/Socials.vue";
import Button from "../components/Button.vue";
import MailCopy from "../components/MailCopy.vue";

import contact from "../assets/img/contact.jpg";
import avatar from "../assets/img/icons/avatar.png";
</script>

<template>
  <Hero
    :has-padding="true"
    :background-image="contact"
    :background-brightness="0.2"
    size="md"
  >
    <div
      class="flex flex-col md:grid md:grid-cols-[max-content_max-content] gap-16 md:max-w-[1024px]"
    >
      <header class="flex flex-col gap-4">
        <img class="e-bg-icon rounded-xl shadow-xl" :src="avatar" alt="" />
      </header>

      <div class="flex flex-col gap-10">
        <div class="flex flex-col">
          <h1 class="font-hero text-[var(--primary-color)]">Marcos G.</h1>
          <h3>Información de Contacto</h3>
          <Socials class="pt-2" />
        </div>
        <div class="flex flex-col gap-4">
          <p class="max-w-[420px] text-[var(--light-text)]">
            Puedes contactar conmigo a través de las redes, o enviarme un correo
            electrónico.
          </p>
          <MailCopy email="marcosggdev@gmail.com" />
        </div>
      </div>
    </div>
  </Hero>
</template>
