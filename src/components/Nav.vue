<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resolveCSSVar } from "../utils/resolveCSSVar";
import { NavValidator } from "../validation/ComponentValidators";

import Button from "./Button.vue";
import Socials from "./Socials.vue";
import Navbar from "./Navbar.vue";

import avatar from "../assets/img/icons/avatar.png";

const props = defineProps({
  thresholdTheme: {
    type: Object,
    required: true,
    validator: NavValidator,
  },
  nonThresholdTheme: {
    type: Object,
    required: true,
    validator: NavValidator,
  },
});

const navRef = ref(null);

// 🔥 STATE
const isInThreshold = ref(true);

// 🎯 THEME ACTIVE
const theme = computed(() =>
  isInThreshold.value ? props.thresholdTheme : props.nonThresholdTheme,
);

const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/files/cv.pdf";
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(() => {
  if (!navRef.value) return;

  const nav = navRef.value;

  let lastScrollY = window.scrollY;
  let isOpen = true;

  const fullHeight = nav.getBoundingClientRect().height;

  const openNav = () => {
    if (isOpen) return;
    isOpen = true;

    gsap.to(nav, {
      height: fullHeight,
      duration: 0.35,
      ease: "power2.out",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      overflow: "hidden",
    });
  };

  const closeNav = () => {
    if (!isOpen) return;
    isOpen = false;

    gsap.to(nav, {
      height: 0,
      duration: 0.3,
      ease: "power2.inOut",
      paddingTop: 0,
      paddingBottom: 0,
      overflow: "hidden",
    });
  };

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: () => {
      const scrollY = window.scrollY;
      const goingDown = scrollY > lastScrollY;
      const nearTop = scrollY < window.innerHeight * 0.8;

      lastScrollY = scrollY;
      isInThreshold.value = nearTop;

      gsap.to(nav, {
        backgroundColor: resolveCSSVar(theme.value.backgroundColor),
        duration: 0.25,
      });

      if (nearTop) {
        openNav();
      } else if (goingDown) {
        closeNav();
      } else {
        openNav();
      }
    },
  });
});
</script>

<template>
  <nav
    ref="navRef"
    class="flex flex-row items-center p-2 justify-between pl-4 pr-4 w-full z-50 transition-colors"
    :style="{
      '--nav-bg': resolveCSSVar(theme.backgroundColor),
      '--nav-text': resolveCSSVar(theme.textColor),
      '--nav-navbar-color': resolveCSSVar(theme.navbarTheme.color),
      '--nav-navbar-hover': resolveCSSVar(theme.navbarTheme.hoverColor),
      '--nav-navbar-current': resolveCSSVar(theme.navbarTheme.currentColor),
    }"
  >
    <!-- LEFT -->
    <div class="flex flex-row gap-2">
      <img class="bg-icon" :src="avatar" alt="" />

      <div class="flex flex-col gap-2">
        <p class="text-[var(--nav-text)] font-semibold">marcosggdev</p>

        <Socials colorClass="text-[var(--nav-text)]" />
      </div>
    </div>

    <!-- RIGHT -->
    <div class="flex flex-row items-center gap-4">
      <Navbar
        class="flex flex-row items-center gap-2 text-[var(--nav-navbar-color)]"
        group="main"
        :theme="theme.navbarTheme"
      />

      <Button
        :callback="downloadCV"
        :variant="isInThreshold ? 'secondary' : 'primary'"
        :color="isInThreshold ? 'var(--nav-text)' : ''"
        :background-color="isInThreshold ? '' : 'var(--nav-text)'"
      >
        <div class="flex flex-row items-center gap-2">
          <span text-[var(--nav-text)]>CV</span>

          <Icon
            icon="material-symbols:download"
            class="sm-icon"
            :class="
              isInThreshold ? 'text-[var(--nav-text)]' : 'text-[var(--nav-bg)]'
            "
          />
        </div>
      </Button>
    </div>
  </nav>
</template>
