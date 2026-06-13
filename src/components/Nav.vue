<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import UnderlineLink from "./UnderlineLink.vue";
import Button from "./Button.vue";
import Socials from "./Socials.vue";

import avatar from "../assets/img/icons/avatar.png";

gsap.registerPlugin(ScrollTrigger);

const currentRoute = useRoute();
const router = useRouter();
const routes = router.getRoutes();

const navRef = ref(null);

// 🔥 STATE THRESHOLD
const isInThreshold = ref(true);

// 🎨 THEMES
const themes = {
  inside: {
    background: "transparent",
    title: "var(--light-title)",
    text: "var(--light-text)",
    textHover: "var(--light-text-hover)",
    buttonVariant: "secondary",
    buttonText: "text-white",
  },
  outside: {
    background: "white",
    title: "var(--dark-title)",
    text: "var(--dark-text)",
    textHover: "var(--dark-text-hover)",
    buttonVariant: "primary",
    buttonText: "text-black",
  },
};

// 🎯 THEME ACTIVO
const theme = computed(() =>
  isInThreshold.value ? themes.inside : themes.outside,
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
      const nearTop = scrollY < window.innerHeight * 0.5;

      lastScrollY = scrollY;

      // 🔥 THRESHOLD STATE
      isInThreshold.value = nearTop;

      if (nearTop) {
        gsap.to(nav, {
          backgroundColor: theme.value.background,
          duration: 0.25,
        });

        openNav();
        return;
      }

      gsap.to(nav, {
        backgroundColor: theme.value.background,
        duration: 0.25,
      });

      if (goingDown) {
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
      '--nav-title': theme.title,
      '--nav-text': theme.text,
      '--nav-text-hover': theme.textHover,
    }"
  >
    <div class="flex flex-row gap-2">
      <img class="bg-icon" :src="avatar" alt="" />
      <div class="flex flex-col gap-2">
        <p :style="{ color: theme.title }">marcosggdev</p>
        <Socials color="text-[var(--nav-title)]" />
      </div>
    </div>

    <div class="flex flex-row items-center gap-4">
      <ul class="flex flex-row gap-2 w-fit">
        <UnderlineLink
          v-for="route in routes"
          :key="route.path"
          :href="route.path"
          class="flex flex-row items-center gap-1"
          :style="{ color: theme.text }"
          color="text-[var(--nav-text)]"
          current-color="text-[var(--nav-title)]"
          :darkens="!isInThreshold"
        >
          {{ route.name }}
        </UnderlineLink>
      </ul>

      <Button :callback="downloadCV" :variant="theme.buttonVariant">
        <div class="flex flex-row items-center gap-2">
          <span :class="theme.buttonText">CV</span>
          <Icon
            icon="material-symbols:download"
            class="sm-icon text-[var(--nav-title)]"
          />
        </div>
      </Button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background-color: var(--nav-bg);
  transition: background-color 0.25s ease;
}

/* título */
.nav-title {
  color: var(--nav-title);
  transition: color 0.25s ease;
}

/* links */
.nav-link {
  color: var(--nav-text);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--nav-text-hover);
}

/* botón texto */
.nav-button-text {
  transition: color 0.2s ease;
}
</style>
