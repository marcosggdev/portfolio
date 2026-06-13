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
  const { r, g, b } = parseColor(hex);

  return `rgb(
    ${Math.min(255, Math.max(0, r + amount))},
    ${Math.min(255, Math.max(0, g + amount))},
    ${Math.min(255, Math.max(0, b + amount))}
  )`;
};

const hoverColor = computed(() => {
  const amount = props.darkens ? -120 : 120;
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
    class="relative flex flex-row"
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
