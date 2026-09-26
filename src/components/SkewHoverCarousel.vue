<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import fallbackImg from "../assets/img/fallback.png";
import mdoImg from "../assets/img/mdo.png";

import { SkewHoverCarouselValidator } from "../validation/ComponentValidators";

/**
 * 📦 Props del componente
 */
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      {
        image: mdoImg,
        href: "/proyectos/mdo-corp-sl",
        title: "Página oficial de MDO Corp. S. L.",
        subtitle:
          "SPA dinámica y muy visual, con efectos avanzados y ambientación aérea",
        text: "",
        brightness: 0.8,
      },
      {
        image: fallbackImg,
        href: "#",
        title: "Próximamente...",
        subtitle: "",
        text: "",
        brightness: 0.7,
      },
      {
        image: fallbackImg,
        href: "#",
        title: "Próximamente...",
        subtitle: "",
        text: "",
        brightness: 0.7,
      },
    ],
    validator: SkewHoverCarouselValidator,
  },
});

const router = useRouter();

const activeIndex = ref(0);

const setActive = (i) => {
  activeIndex.value = i;
};

const navigate = (href) => {
  if (!href || href === "#") {
    return;
  }

  router.push(href);
};

/**
 * Detecta el tipo de input disponible.
 *
 * true  -> ratón (hover)
 * false -> táctil
 */
const supportsHover = ref(true);

let mediaQuery;

onMounted(() => {
  mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  supportsHover.value = mediaQuery.matches;

  const listener = (e) => {
    supportsHover.value = e.matches;
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", listener);
  } else {
    mediaQuery.addListener(listener);
  }

  onUnmounted(() => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.removeListener(listener);
    }
  });
});

/**
 * 🔥 Focus grid system
 */
const gridTemplate = computed(() => {
  const small = props.items.length > 1 ? 0.2 / (props.items.length - 1) : 1;

  return props.items
    .map((_, i) => (i === activeIndex.value ? 0.8 : small))
    .map((v) => `${v}fr`)
    .join(" ");
});

/**
 * Click / tap sobre una tarjeta.
 *
 * DESKTOP:
 * - Mantiene el comportamiento original.
 * - El click navega directamente.
 *
 * MOBILE:
 * - Si se toca una tarjeta inactiva:
 *   → se convierte en activa.
 *   → NO navega.
 *
 * - Si se toca una tarjeta que ya está activa:
 *   → navega.
 */
const handleItemClick = (event, index, href) => {
  if (supportsHover.value) {
    // Desktop: comportamiento original.
    if (href === "#") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    navigate(href);

    return;
  }

  // Mobile: primer toque sobre una tarjeta inactiva.
  if (index !== activeIndex.value) {
    event.preventDefault();
    activeIndex.value = index;

    return;
  }

  // Mobile: tarjeta ya activa.
  if (href === "#") {
    event.preventDefault();
    return;
  }

  event.preventDefault();
  navigate(href);
};

/* ==========================
   Swipe (solo táctil)
========================== */

const touchStartX = ref(0);
const touchCurrentX = ref(0);

const SWIPE_THRESHOLD = 45;

function onTouchStart(e) {
  if (supportsHover.value) {
    return;
  }

  touchStartX.value = e.touches[0].clientX;
  touchCurrentX.value = touchStartX.value;
}

function onTouchMove(e) {
  if (supportsHover.value) {
    return;
  }

  touchCurrentX.value = e.touches[0].clientX;
}

function onTouchEnd() {
  if (supportsHover.value) {
    return;
  }

  const delta = touchCurrentX.value - touchStartX.value;

  if (Math.abs(delta) < SWIPE_THRESHOLD) {
    return;
  }

  if (delta < 0 && activeIndex.value < props.items.length - 1) {
    activeIndex.value++;
  } else if (delta > 0 && activeIndex.value > 0) {
    activeIndex.value--;
  }
}
</script>

<template>
  <div
    class="grid h-full flex-1 transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] touch-pan-y"
    :style="{ gridTemplateColumns: gridTemplate }"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend.passive="onTouchEnd"
  >
    <a
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      class="relative flex flex-col justify-end md:skew-x-6 shadow-xl overflow-hidden transition-all duration-500"
      :class="[
        index === activeIndex ? 'z-10' : 'opacity-40',

        item.href === '#' ? 'cursor-default' : 'cursor-pointer',
      ]"
      @mouseenter="supportsHover && setActive(index)"
      @click="handleItemClick($event, index, item.href)"
    >
      <!-- IMAGEN -->
      <img
        class="absolute inset-0 w-full h-full object-cover aspect-[1/2]"
        :style="{
          filter: `brightness(${item.brightness})`,
        }"
        :src="item.image || fallbackImg"
        alt=""
      />

      <!-- CONTENIDO -->
      <div
        class="absolute bottom-0 left-0 w-full p-8 text-white transition-all duration-500 md:-skew-x-6"
        :class="
          index === activeIndex
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        "
      >
        <div class="min-w-[200px] md:min-w-[240px] max-w-[60%] overflow-hidden">
          <slot name="content" :item="item" :active="index === activeIndex">
            <h1 class="hidden md:block text-xl font-bold">
              {{ item.title }}
            </h1>

            <h4 v-if="item.subtitle" class="hidden md:block text-sm opacity-80">
              {{ item.subtitle }}
            </h4>

            <p v-if="item.text" class="hidden md:block text-xs mt-2 opacity-70">
              {{ item.text }}
            </p>

            <h3 class="md:hidden text-sm font-bold">
              {{ item.title }}
            </h3>
          </slot>
        </div>
      </div>
    </a>
  </div>
</template>
