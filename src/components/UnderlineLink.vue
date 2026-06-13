<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  href: { type: String, required: true },

  color: { type: String, default: "#eaeaea" },

  currentColor: {
    type: String,
    default: "text-[var(--primary-color)]",
  },

  darkens: { type: Boolean, default: false },
});

const hover = ref(false);
const route = useRoute();

const isActive = computed(() => route.path === props.href);

// ---------- color utils ----------
const parseColor = (hex) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

const adjustColor = (hex, amount) => {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  // 👇 solo ajustas luminosidad
  l = Math.min(1, Math.max(0, l + amount / 100));

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r2, g2, b2;

  if (s === 0) {
    r2 = g2 = b2 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  return `rgb(${r2 * 255}, ${g2 * 255}, ${b2 * 255})`;
};

const hoverColor = computed(() => {
  const amount = props.darkens ? -200 : 200;
  return adjustColor(props.color, amount);
});

// ---------- color final ----------
const linkColor = computed(() => {
  if (isActive.value) return null; // usa class current
  return hover.value ? hoverColor.value : props.color;
});
</script>

<template>
  <div
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="relative flex flex-row w-fit"
  >
    <RouterLink
      :to="href"
      class="flex flex-row w-full h-full items-center justify-center transition-colors duration-200"
      :class="isActive ? [props.currentColor, 'font-bold'] : ''"
      :style="!isActive ? { color: linkColor } : {}"
    >
      <slot />
    </RouterLink>

    <div
      class="absolute bottom-0 left-0 h-[1px] bg-current transition-all duration-300 ease-out"
      :style="{
        width: isActive ? '0%' : hover ? '100%' : '0%',
      }"
    />
  </div>
</template>
