<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Section from "../components/Section.vue";
import AnimatedGradientSVG from "../components/AnimatedGradientSVG.vue";

import villar from "../assets/img/villar.jpg";
import ibq from "../assets/img/ibq.jpg";
import ordenador from "../assets/img/ordenador.jpg";
import avatar from "../assets/img/icons/avatar.png";
import Socials from "../components/Socials.vue";
import academic from "../assets/img/svg/academic.svg";
import programming from "../assets/img/programming.jpg";
import experience from "../assets/img/experience.jpg";

const section = ref(null);
const background = ref(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: section.value,
    start: "top top",
    end: "bottom bottom",
    pin: background.value,
    pinSpacing: false,
    markers: true,
  });

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <section ref="section" class="relative h-[300vh]">
    <div ref="background" class="absolute inset-0 h-screen w-full">
      <AnimatedGradientSVG class="h-full w-full" :brightness="0.5" />
    </div>

    <div
      class="relative z-10 flex flex-col pt-[100vh] max-w-[1024px] ml-auto mr-auto"
    >
      <div
        class="grid grid-cols-2 gap-16 p-16 pt-32 pb-32 justify-center relative h-screen"
      >
        <div class="flex flex-col gap-2 relative items-center justify-center">
          <div class="grid grid-cols-[max-content_auto] items-start gap-4">
            <Icon
              class="text-white bg-icon"
              icon="mdi:book-open-page-variant"
            />
            <h3 class="text-[var(--light-title)]">
              Estudié el CFGS DAW durante 2 años en el IES Bernaldo de Quirós,
              Mieres.
            </h3>
          </div>
          <div
            class="absolute inset-0 m-auto -z-1 bg-red-200 aspect-[1/1.3] h-[60vh] w-fit rounded-lg bg-cover bg-center bg-no-repeat"
            :style="`background-image: url(${ibq}); filter: brightness(0.4)`"
          >
            <div
              class="absolute bottom-0 right-0 bg-red-400 aspect-[1/1.3] h-[40%] w-fit translate-x-[50px] translate-y-[-50px] rounded-lg shadow-xl bg-cover bg-center bg-no-repeat"
              :style="`background-image: url(${programming})`"
            ></div>
          </div>
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <h3 class="text-[var(--light-title)]">Estudios</h3>
            <h5 class="text-[var(--light-text)]">
              Técnico Superior en Desarrollo de Aplicaciones Web
            </h5>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-[var(--light-title)]">Otros Estudios</h3>
            <h5 class="text-[var(--light-text)]">Bachillerato de Ciencias</h5>
            <h5 class="text-[var(--light-text)]">
              Doble Grado en Física y Matemáticas
            </h5>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-[var(--light-title)]">Stack</h3>
            <ul class="text-[var(--light-text)] grid grid-cols-3">
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>Typescript</li>
              <li>VueJS</li>
              <li>React</li>
              <li>Laravel</li>
              <li>Wordpress</li>
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>TailwindCSS</li>
              <li>OpenGL / WebGL</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 items-center gap-16 h-screen pt-32 pb-32 max-w-[1024px] ml-auto mr-auto"
      >
        <div class="flex flex-col gap-8">
          <h3 class="text-[var(--light-title)]">Experiencia</h3>
          <div class="flex flex-col gap-8 overflow-y-auto h-[50vh]">
            <div class="grid grid-cols-[max-content_auto] gap-4">
              <Icon class="text-white bg-icon" icon="fa6-brands:wordpress" />
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row gap-4 items-center">
                    <h5 class="text-[var(--light-title)]">3 Meses</h5>
                    <h5 class="text-[var(--light-text)]">Prácticas FP</h5>
                    <h5 class="text-[var(--light-text)]">2023</h5>
                  </div>
                  <p class="text-[var(--light-text)]">
                    Realicé mis prácticas FP en una startup Ovetense, y aprendí
                    a usar Wordpress: crear temas personalizados, hacer páginas
                    con el editor, usar plugins...
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-[max-content_auto] gap-4">
              <Icon class="text-white bg-icon" icon="logos:nuxt-icon" />
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row gap-4 items-center">
                    <h5 class="text-[var(--light-title)]">3 Meses</h5>
                    <h5 class="text-[var(--light-text)]">
                      Proyecto MDO Corp. S. L.
                    </h5>
                    <h5 class="text-[var(--light-text)]">2025</h5>
                  </div>
                  <p class="text-[var(--light-text)]">
                    Realicé la página de empresa de MDO Corp. S. L., empresa de
                    la que formo parte como socio. El proyecto se realizó con
                    Nuxt + Vue, principalmente.
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-[max-content_auto] gap-4">
              <div class="flex flex-col items-center gap-2">
                <Icon class="text-white bg-icon" icon="logos:c-plusplus" />
                <Icon class="text-white bg-icon" icon="devicon:opengl" />
                <Icon class="text-white bg-icon" icon="logos:discord-icon" />
              </div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row gap-4 items-center">
                    <h5 class="text-[var(--light-title)]">12 Meses</h5>
                    <h5 class="text-[var(--light-text)]">Otros proyectos</h5>
                  </div>
                  <p class="text-[var(--light-text)]">
                    En mi tiempo libre desarrollo otros proyectos personales, no
                    necesariamente en el ámbito web. Algunos ejemplos:
                    videojuego web 2D con WebGL, Bots para Discord con
                    discord.js, etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img class="w-full h-full object-cover" :src="experience" alt="" />
      </div>
    </div>
  </section>
</template>
