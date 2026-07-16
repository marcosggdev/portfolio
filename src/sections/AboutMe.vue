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
import AboutMeStudies from "./AboutMeStudies.vue";
import AboutMeExperience from "./AboutMeExperience.vue";

gsap.registerPlugin(ScrollTrigger);

const section = ref(null);
const background = ref(null);

let trigger = null;

// -------------------- INIT --------------------
onMounted(() => {
  if (!section.value || !background.value) return;

  const el = section.value;
  const bg = background.value;

  trigger = ScrollTrigger.create({
    trigger: el,
    start: "top top",
    end: "bottom bottom",

    pin: bg,
    pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

// -------------------- CLEANUP --------------------
onUnmounted(() => {
  trigger?.kill();
  trigger = null;

  ScrollTrigger.getAll().forEach((t) => t.kill());
});
</script>

<template>
  <section ref="section" class="relative h-[calc(300vh + 64)]">
    <div ref="background" class="absolute inset-0 h-screen w-full">
      <AnimatedGradientSVG class="h-full w-full" :brightness="0.5" />
    </div>
    <div
      class="relative z-10 flex flex-col pt-[100vh] max-w-[1024px] gap-64 ml-auto mr-auto"
    >
      <AboutMeStudies />
      <AboutMeExperience />
    </div>
  </section>
</template>
