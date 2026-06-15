<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Icon } from "@iconify/vue";
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

gsap.registerPlugin(ScrollTrigger);

const section = ref(null);
const background = ref(null);

let trigger = null;

// -------------------- INIT --------------------
onMounted(() => {
  if (!section.value || !background.value) return;

  trigger = ScrollTrigger.create({
    trigger: section.value,
    start: "top top",
    end: "bottom bottom",

    pin: background.value,
    pinSpacing: false,

    invalidateOnRefresh: true,
    anticipatePin: 1,
  });

  // IMPORTANTE: delay para evitar conflictos con layout/router
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

// -------------------- CLEANUP --------------------
onUnmounted(() => {
  trigger?.kill(true);
  trigger = null;

  ScrollTrigger.getAll().forEach((t) => t.kill());
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
        <div class="flex flex-col gap-2">
          <h3 class="text-[var(--light-title)]">Stack</h3>
          <ul class="w-fit h-fit grid grid-cols-4 gap-2 text-white">
            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:html-5" />
              <span>HTML</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:css-3" />
              <span>CSS</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:javascript" />
              <span>JavaScript</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon
                class="bg-icon aspect-square"
                icon="logos:typescript-icon"
              />
              <span>TypeScript</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:vue" />
              <span>Vue</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:react" />
              <span>React</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:laravel" />
              <span>Laravel</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:wordpress-icon" />
              <span>WordPress</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:mysql" />
              <span>MySQL</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="logos:postgresql" />
              <span>PostgreSQL</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon
                class="bg-icon aspect-square"
                icon="logos:tailwindcss-icon"
              />
              <span>TailwindCSS</span>
            </li>

            <li class="flex flex-col items-center gap-1 aspect-square">
              <Icon class="bg-icon aspect-square" icon="simple-icons:opengl" />
              <span>OpenGL</span>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-4">
            <h3 class="text-[var(--light-title)]">Estudios</h3>
            <div
              class="flex flex-col-reverse gap-8 overflow-y-scroll max-h-[60vh]"
            >
              <div class="grid grid-cols-[max-content_auto] items-start gap-4">
                <div class="flex flex-col gap-2">
                  <Icon class="text-white bg-icon" icon="mdi:school" />
                  <span
                    class="text-[var(--primary-color)] flex flex-row items-center justify-center p-2 pt-1 pb-1 rounded-full"
                  >
                    2016
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <h5 class="text-[var(--light-title)]">
                    Bachillerato de Ciencias
                  </h5>
                  <p class="text-[var(--light-text)]">
                    Cursé el bachillerato de ciencias en el IES Bernaldo de
                    Quirós, y me presenté a la PAU posteriormente. Mi objetivo
                    era cursar el DG en Física y Matemáticas, y conseguí la nota
                    necesaria.
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-[max-content_auto] items-start gap-4">
                <div class="flex flex-col gap-2">
                  <Icon class="text-white bg-icon" icon="mdi:school" />
                  <span
                    class="text-[var(--primary-color)] flex flex-row items-center justify-center p-2 pt-1 pb-1 rounded-full"
                  >
                    2019
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <h5 class="text-[var(--light-title)]">
                    Doble Grado en Física y Matemáticas
                  </h5>
                  <p class="text-[var(--light-text)]">
                    Cursé el Doble Grado en Física y Matemáticas en la
                    Universidad de Oviedo durante 3 años. No completé la
                    carrera, pero descubrí mientras la cursaba mi pasión por el
                    desarrollo de aplicaciones.
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-[max-content_auto] items-start gap-4">
                <div class="flex flex-col gap-2">
                  <Icon class="text-white bg-icon" icon="mdi:school" />
                  <span
                    class="text-[var(--primary-color)] flex flex-row items-center justify-center p-2 pt-1 pb-1 rounded-full"
                  >
                    2022
                  </span>
                </div>
                <div class="flex flex-col gap-2">
                  <h5 class="text-[var(--light-title)]">
                    Técnico Superior en Desarrollo de Aplicaciones Web
                  </h5>
                  <p class="text-[var(--light-text)]">
                    Cursé el CFGS DAW durante 2 años y obtuve mi título al
                    finalizar el curso.
                  </p>
                </div>
              </div>
            </div>
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
                    <h5 class="text-[var(--light-text)]">2020 - 2026</h5>
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
