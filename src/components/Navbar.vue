<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { resolveCSSVar } from "../utils/resolveCSSVar";
import { NavbarValidator } from "../validation/ComponentValidators";

const props = defineProps({
  group: {
    type: String,
    required: true,
    validator: (value) => ["main", "legal"].includes(value),
  },
  theme: {
    type: Object,
    required: true,
    validator: NavbarValidator,
  },
});

const router = useRouter();
const currentRoute = useRoute();

const routes = computed(() =>
  router.getRoutes().filter((route) => route.meta?.group === props.group),
);
</script>

<template>
  <ul class="gap-2 w-fit">
    <RouterLink
      v-for="route in routes"
      :key="route.name"
      :to="{ name: route.name }"
      :style="{
        '--color': resolveCSSVar(theme.color),
        '--hover-color': resolveCSSVar(theme.hoverColor),
        '--current-color': resolveCSSVar(theme.currentColor),
      }"
      class="transition"
      :class="
        currentRoute.path === route.path
          ? 'text-[var(--current-color)] font-bold'
          : 'text-[var(--color)] hover:text-[var(--hover-color)] opacity-70 hover:opacity-100'
      "
    >
      {{ route.meta.label }}
    </RouterLink>
  </ul>
</template>
