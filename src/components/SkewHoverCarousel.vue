<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import fallbackImg from "../assets/img/fallback.png";
import mdoImg from "../assets/img/mdo.png";
import SkewHoverCarouselSchema from "../data/SkewHoverCarouselSchema";

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
        title: "Página oficial de MDO Corp. S. L. ",
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

/**
 * 🔥 focus grid system (estable y animable)
 */
const gridTemplate = computed(() => {
  const small = 0.2 / (props.items.length - 1);

  return props.items
    .map((_, i) => (i === activeIndex.value ? 0.8 : small))
    .map((v) => `${v}fr`)
    .join(" ");
});

const navigate = (href) => {
  router.push(href);
};
</script>

<template>
  <div
    class="grid h-full transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    :style="{ gridTemplateColumns: gridTemplate }"
  >
    <a
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      class="relative flex flex-col justify-end skew-x-6 shadow-xl overflow-hidden transition-all duration-500"
      :class="[
        index === activeIndex ? 'z-10' : 'opacity-40',
        item.href === '#' ? 'cursor-default' : 'cursor-pointer',
      ]"
      @mouseenter="setActive(index)"
      @click.prevent="item.href !== '#' && navigate(item.href)"
    >
      <!-- IMAGEN -->
      <img
        class="absolute inset-0 w-full h-full object-cover aspect-[1/2]"
        :style="`filter: brightness(${item.brightness})`"
        :src="item.image || fallbackImg"
        alt=""
      />

      <!-- CONTENIDO (FUERA DEL FLUJO) -->
      <div
        class="absolute bottom-0 left-0 w-full p-4 text-white transition-all duration-500"
        :class="
          index === activeIndex
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3 pointer-events-none'
        "
      >
        <!-- caja interna con ancho estable -->
        <div class="min-w-[240px] max-w-[60%] overflow-hidden">
          <slot name="content" :item="item" :active="index === activeIndex">
            <h1 class="text-xl font-bold">
              {{ item.title }}
            </h1>

            <h4 v-if="item.subtitle" class="text-sm opacity-80">
              {{ item.subtitle }}
            </h4>

            <p v-if="item.text" class="text-xs mt-2 opacity-70">
              {{ item.text }}
            </p>
          </slot>
        </div>
      </div>
    </a>
  </div>
</template>
