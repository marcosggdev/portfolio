<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import Section from "../components/Section.vue";
import AnimatedGradientSVG from "../components/AnimatedGradientSVG.vue";

import villar from "../assets/img/villar.jpg";
import ibq from "../assets/img/ibq.jpg";
import ordenador from "../assets/img/ordenador.jpg";
import avatar from "../assets/img/icons/avatar.png";
import Socials from "../components/Socials.vue";
import academic from "../assets/img/svg/academic.svg";

const aboutMe = ref(null);
const images = ref(null);

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// valores actuales (render)
let aboutY = 0;
let imagesY = 0;

// objetivos (scroll)
let targetAboutY = 0;
let targetImagesY = 0;

let rafId = null;

const lerp = (a, b, t) => a + (b - a) * t;

const handleScroll = () => {
  const vh = window.innerHeight;

  // ===== ABOUT ME =====
  const el = aboutMe.value;
  if (el) {
    const rect = el.getBoundingClientRect();
    const progress = (vh - rect.top) / (vh + rect.height);
    const t = clamp(progress, 0, 1);

    targetAboutY = (0.5 - t) * 360;
  }

  // ===== IMAGES =====
  const img = images.value;
  if (img) {
    const rect = img.getBoundingClientRect();
    const progress = (vh - rect.top) / (vh + rect.height);
    const t = clamp(progress, 0, 1);

    targetImagesY = (0.5 - t) * 720;
  }
};

const animate = () => {
  const el = aboutMe.value;
  const img = images.value;

  // suavizado (0.08 = smooth, 0.2 = más rápido)
  const smooth = 0.08;

  aboutY = lerp(aboutY, targetAboutY, smooth);
  imagesY = lerp(imagesY, targetImagesY, smooth);

  if (el) {
    el.style.transform = `translateY(${aboutY}px)`;
  }

  if (img) {
    img.style.transform = `translateY(${imagesY}px)`;
  }

  rafId = requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();
  animate();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);

  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <Section
    class="relative text-black grid grid-cols-[40%_auto] gap-16"
    size="bg"
  >
    <AnimatedGradientSVG class="absolute inset-0 w-full h-fit m-auto -z-1" />
    <div class="flex flex-col gap-2">
      <div
        ref="images"
        class="align-self-start h-full w-[80%] grid grid-rows-3 grid-cols-2 gap-4"
      >
        <img
          class="aspect-square object-cover rounded-lg shadow-xl"
          :src="villar"
          alt=""
        />
        <img
          class="aspect-square object-cover rounded-lg shadow-xl"
          :src="ibq"
          alt=""
        />
        <img
          class="aspect-square object-cover rounded-lg shadow-xl"
          :src="ordenador"
          alt=""
        />
      </div>
    </div>
    <div class="flex flex-col relative bg-white">
      <div
        ref="aboutMe"
        class="grid grid-cols-[auto_max-content] w-full h-full absolute inset-0 bg-white"
      >
        <div class="flex flex-col gap-8 p-16 justify-center">
          <header class="flex flex-col gap-2">
            <img class="e-bg-icon" :src="avatar" alt="" />
            <h2>Marcos G.</h2>
            <Socials color="text-black" :expanded="true" />
          </header>
          <main>
            <p>
              Me llamo Marcos G. y vivo en una zona rural Asturiana en el
              Concejo de Aller. Obtuve mi título de Técnico Superior en
              Desarrollo de Aplicaciones Web al terminar el CFGS DAW en el IES
              Bernaldo de Quirós, Mieres, y actualmente busco mi primer trabajo
              como desarrollador.
            </p>
          </main>
        </div>
        <div class="grid grid-rows-4 justify-center gap-4 p-4 mt-32">
          <img
            :src="academic"
            class="aspect-square object-contain e-bg-icon"
            alt=""
          />
        </div>
      </div>
    </div>
  </Section>
</template>
