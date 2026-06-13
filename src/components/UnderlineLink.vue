<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  href: { type: String, required: true },
  color: { type: String, default: "text-white" },
});

const hover = ref(false);
const route = useRoute();

// Detecta si es la ruta activa
const isActive = computed(() => route.path === props.href);
</script>

<template>
  <div
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="relative flex flex-row"
  >
    <RouterLink
      :to="href"
      class="flex flex-row w-full h-full items-center justify-center"
      :class="color"
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
