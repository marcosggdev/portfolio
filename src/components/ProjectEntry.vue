<script setup>
import Breadcrumbs from "./Breadcrumbs.vue";
import Navbar from "./Navbar.vue";
import Section from "./Section.vue";
import { breadcrumbsThemeVariations } from "../theme/Breadcrumbs";
import { Icon } from "@iconify/vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
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
          <h1 class="text-[var(--dark-title)]">{{ title }}</h1>
          <h2 class="text-[var(--dark-subtitle)]">{{ subtitle }}</h2>
        </header>
        <slot name="content"></slot>
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
                    href="#descripcion"
                    class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Icon icon="lucide:file-text" class="sm-icon" />
                    Descripción
                  </a>

                  <a
                    href="#dificultades"
                    class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Icon icon="lucide:gauge" class="sm-icon" />
                    Dificultades
                  </a>

                  <a
                    href="#puntos-fuertes"
                    class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Icon icon="lucide:check-circle" class="sm-icon" />
                    Puntos Fuertes
                  </a>

                  <a
                    href="#galeria"
                    class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Icon icon="lucide:images" class="sm-icon" />
                    Galería
                  </a>
                </div>
              </div>
            </nav>

            <!-- Separador -->
            <div class="w-full h-px bg-black/10"></div>

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
              @click="scrollToTop"
              class="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors cursor-pointer"
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
