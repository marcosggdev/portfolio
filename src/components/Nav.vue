<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

import { resolveCSSVar } from "../utils/resolveCSSVar";
import { NavValidator } from "../validation/ComponentValidators";

import { Icon } from "@iconify/vue";
import Button from "./Button.vue";
import Socials from "./Socials.vue";
import Navbar from "./Navbar.vue";

import avatar from "../assets/img/icons/avatar.png";

// -------------------- PROPS --------------------
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
  fixed: { type: Boolean, default: false },
  threshold: { type: String, default: "0.8" },
});

// -------------------- STATE --------------------
const navRef = ref(null);

const isInThreshold = ref(true);
const isHidden = ref(false);

let lastScrollY = 0;
let navHeight = 0;

// -------------------- ROUTE (solo por consistencia futura) --------------------
useRoute();

// -------------------- THEME --------------------
const theme = computed(() =>
  !props.fixed
    ? isInThreshold.value
      ? props.thresholdTheme
      : props.nonThresholdTheme
    : props.nonThresholdTheme,
);

// -------------------- SCROLL LOGIC --------------------
const onScroll = () => {
  if (!navRef.value || props.fixed) return;

  const scrollY = window.scrollY;
  const goingDown = scrollY > lastScrollY;
  const delta = Math.abs(scrollY - lastScrollY);

  if (delta < 2) return; // evita micro-jitter

  const nearTop = scrollY < window.innerHeight * Number(props.threshold);

  isInThreshold.value = nearTop;

  // -------------------------
  // VISIBILIDAD NAVBAR
  // -------------------------
  if (nearTop) {
    isHidden.value = false;
  } else {
    isHidden.value = goingDown;
  }

  // -------------------------
  // BACKGROUND ANIMATION
  // -------------------------
  gsap.to(navRef.value, {
    backgroundColor: resolveCSSVar(theme.value.backgroundColor),
    duration: 0.25,
    overwrite: "auto",
  });

  lastScrollY = scrollY;
};

// -------------------- WATCH VISIBILITY --------------------
watch(isHidden, (hidden) => {
  if (!navRef.value) return;

  gsap.to(navRef.value, {
    height: hidden ? 0 : navHeight,
    overflow: hidden ? "hidden" : "none",
    paddingTop: hidden ? 0 : "0.5rem",
    paddingBottom: hidden ? 0 : "0.5rem",
    duration: 0.3,
    ease: "power2.out",
    overwrite: "auto",
  });
});

// -------------------- LIFECYCLE --------------------
onMounted(() => {
  lastScrollY = window.scrollY;

  navHeight = navRef.value.getBoundingClientRect().height;

  window.addEventListener("scroll", onScroll, { passive: true });

  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);

  if (navRef.value) {
    gsap.killTweensOf(navRef.value);
  }
});

// -------------------- ACTIONS --------------------
const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/files/cv.pdf";
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <nav
    ref="navRef"
    class="flex flex-row items-center p-2 justify-between pl-4 pr-4 w-full z-50 transition-colors"
    :class="fixed ? 'bg-[var(--nav-bg)]' : ''"
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
          <span
            :class="
              isInThreshold ? 'text-[var(--nav-text)]' : 'text-[var(--nav-bg)]'
            "
          >
            CV
          </span>

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
