<script setup>
import { computed, inject } from "vue";
import { useRoute } from "vue-router";
import { resolveCSSVar } from "../utils/resolveCSSVar";
import { BreadcrumbsValidator } from "../validation/ComponentValidators";
import { Icon } from "@iconify/vue";

const props = defineProps({
  theme: {
    type: Object,
    required: true,
    validator: BreadcrumbsValidator,
  },
});

const currentRoute = useRoute();
const slugLabel = inject("slugLabel");

const routes = computed(() =>
  currentRoute.matched
    .map((route) => {
      let label = route.meta?.label;

      if (route.path.includes(":slug") && slugLabel?.trim?.()) {
        label = slugLabel;
      }

      if (label) {
        return {
          ...route,
          breadcrumbLabel: label,
        };
      }

      const defaultChild = route.children?.find(
        (child) => child.path === "" && child.meta?.label,
      );

      if (!defaultChild) {
        return null;
      }

      return {
        ...defaultChild,
        breadcrumbLabel: defaultChild.meta.label,
      };
    })
    .filter(Boolean),
);

const isActiveRoute = (route) =>
  currentRoute.matched.at(-1)?.path === route.path;
</script>

<template>
  <ul class="w-fit flex flex-row items-center gap-4">
    <RouterLink
      v-for="(route, i) in routes"
      :key="route.name"
      :to="{ name: route.name }"
      :style="{
        '--color': resolveCSSVar(theme.color),
        '--hover-color': resolveCSSVar(theme.hoverColor),
        '--current-color': resolveCSSVar(theme.currentColor),
      }"
      class="transition flex flex-row items-center gap-4"
      :class="
        isActiveRoute(route)
          ? 'text-[var(--current-color)] font-bold'
          : 'text-[var(--color)] hover:text-[var(--hover-color)] opacity-70 hover:opacity-100'
      "
    >
      {{ route.breadcrumbLabel }}
      <Icon
        v-if="i !== routes.length - 1"
        icon="mdi:chevron-right"
        class="text-[var(--color)] opacity-50 text-sm"
      />
    </RouterLink>
  </ul>
</template>
