<script setup>
import Breadcrumbs from "./Breadcrumbs.vue";
import Navbar from "./Navbar.vue";
import Section from "./Section.vue";
import { breadcrumbsThemeVariations } from "../theme/Breadcrumbs";
import { Icon } from "@iconify/vue";

defineProps({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  navigation: {
    type: Array,
    default: () => [],
  },
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <Section :has-padding="true">
    <div class="flex flex-col md:grid md:grid-cols-[70%_auto] gap-16">
      <div class="flex flex-col gap-16 md:min-w-[640px]">
        <Breadcrumbs class="p-4" :theme="breadcrumbsThemeVariations[0]" />

        <header class="flex flex-col gap-2">
          <h1 class="text-[var(--dark-title)]">
            {{ title }}
          </h1>

          <h2 class="text-[var(--dark-subtitle)]">
            {{ subtitle }}
          </h2>
        </header>

        <slot name="content" />
      </div>

      <aside class="hidden md:block">
        <slot name="aside">
          <div class="flex flex-col gap-8 p-4 md:sticky md:top-22">
            <img
              class="w-full h-[160px] object-cover shadow-lg rounded-sm"
              :src="image"
              alt=""
            />

            <!-- Navegación -->
            <nav
              v-if="navigation.length"
              class="flex flex-col gap-4"
              aria-label="Navegación del contenido"
            >
              <div class="flex flex-col gap-4">
                <span
                  class="text-xs font-semibold uppercase tracking-widest text-black/50"
                >
                  Sobre el Proyecto
                </span>

                <div class="flex flex-col gap-3">
                  <a
                    v-for="item in navigation"
                    :key="item.id"
                    :href="`#${item.id}`"
                    class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Icon :icon="item.icon" class="sm-icon" />

                    {{ item.title }}
                  </a>
                </div>
              </div>
            </nav>

            <!-- Separador -->
            <div class="w-full h-px bg-black/10" />

            <!-- Información -->
            <div class="flex flex-col gap-4">
              <span
                class="text-xs font-semibold uppercase tracking-widest text-black/50"
              >
                Más Información
              </span>

              <div class="flex flex-col gap-3 text-sm">
                <a
                  href="/"
                  class="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                >
                  <Icon icon="lucide:house" class="sm-icon" />

                  Inicio
                </a>

                <a
                  href="/proyectos"
                  class="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                >
                  <Icon icon="lucide:folder" class="sm-icon" />

                  Proyectos
                </a>
              </div>
            </div>

            <!-- Volver -->
            <button
              type="button"
              class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors cursor-pointer"
              @click="scrollToTop"
            >
              <Icon icon="lucide:arrow-up" class="sm-icon" />

              Volver arriba
            </button>
          </div>
        </slot>
      </aside>
    </div>
  </Section>
</template>
