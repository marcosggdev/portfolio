<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import Breadcrumbs from "./Breadcrumbs.vue";
import Section from "./Section.vue";
import { breadcrumbsThemeVariations } from "../theme/Breadcrumbs";
import { Icon } from "@iconify/vue";

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { type: String, required: true },
  navigation: { type: Array, default: () => [] },
});

const isMobileMenuOpen = ref(false);
const isBurgerVisible = ref(false);
const isBurgerIdle = ref(false);
const projectContentRef = ref(null);

let scrollTimeout = null;

const updateBurgerVisibility = () => {
  if (!projectContentRef.value) {
    isBurgerVisible.value = false;
    isBurgerIdle.value = false;
    return;
  }

  isBurgerVisible.value =
    projectContentRef.value.getBoundingClientRect().top < 0;

  // El botón vuelve a mostrarse cuando se produce scroll.
  isBurgerIdle.value = false;

  clearTimeout(scrollTimeout);

  // Ocultar el botón después de 2 segundos sin desplazamiento.
  if (isBurgerVisible.value && !isMobileMenuOpen.value) {
    scrollTimeout = setTimeout(() => {
      isBurgerIdle.value = true;
    }, 2000);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

watch(isMobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";

  // Evitar que el temporizador oculte el botón mientras el menú está abierto.
  if (isOpen) {
    clearTimeout(scrollTimeout);
  } else {
    updateBurgerVisibility();
  }
});

onMounted(() => {
  window.addEventListener("scroll", updateBurgerVisibility, {
    passive: true,
  });

  updateBurgerVisibility();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateBurgerVisibility);
  clearTimeout(scrollTimeout);
  document.body.style.overflow = "";
});
</script>

<template>
  <!-- Botón hamburguesa fijo con ocultación animada -->
  <button
    type="button"
    class="fixed top-2 z-40 flex items-center justify-center rounded-xl bg-white/90 p-3 text-black shadow-md backdrop-blur-sm transition-[right,opacity] duration-500 ease-in-out hover:bg-white md:hidden"
    :class="
      isBurgerVisible && !isMobileMenuOpen && !isBurgerIdle
        ? 'right-2 opacity-100'
        : 'right-[-16px] pointer-events-none opacity-0'
    "
    aria-label="Abrir navegación"
    aria-controls="mobile-navigation"
    :aria-expanded="isMobileMenuOpen"
    :tabindex="isBurgerVisible && !isMobileMenuOpen && !isBurgerIdle ? 0 : -1"
    @click="isMobileMenuOpen = true"
  >
    <Icon icon="lucide:menu" class="h-5 w-5" />
  </button>

  <Section :has-padding="true">
    <div class="flex flex-col gap-16 md:grid md:grid-cols-[70%_auto]">
      <!-- Contenido principal -->
      <main
        ref="projectContentRef"
        class="flex min-w-0 flex-col gap-16 md:min-w-[640px]"
      >
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
      </main>

      <!-- Aside de escritorio -->
      <aside class="hidden md:block">
        <slot name="aside">
          <div class="sticky top-22 flex flex-col gap-8 p-4">
            <img
              class="h-[160px] w-full rounded-sm object-cover shadow-lg"
              :src="image"
              alt=""
            />

            <!-- Navegación del contenido -->
            <nav
              v-if="navigation.length"
              class="flex flex-col gap-4"
              aria-label="Navegación del contenido"
            >
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
                  class="flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black"
                >
                  <Icon :icon="item.icon" class="sm-icon" />
                  {{ item.title }}
                </a>
              </div>
            </nav>

            <div class="h-px w-full bg-black/10" />

            <!-- Más información -->
            <div class="flex flex-col gap-4">
              <span
                class="text-xs font-semibold uppercase tracking-widest text-black/50"
              >
                Más Información
              </span>

              <div class="flex flex-col gap-3 text-sm">
                <a
                  href="/"
                  class="flex items-center gap-2 text-black/60 transition-colors hover:text-black"
                >
                  <Icon icon="lucide:house" class="sm-icon" />
                  Inicio
                </a>

                <a
                  href="/proyectos"
                  class="flex items-center gap-2 text-black/60 transition-colors hover:text-black"
                >
                  <Icon icon="lucide:folder" class="sm-icon" />
                  Proyectos
                </a>
              </div>
            </div>

            <!-- Volver arriba -->
            <button
              type="button"
              class="flex cursor-pointer items-center gap-2 text-sm text-black/60 transition-colors hover:text-black"
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

  <!-- Aside móvil -->
  <Transition name="mobile-menu">
    <div
      v-if="isMobileMenuOpen"
      id="mobile-navigation"
      class="fixed inset-0 z-50 overflow-y-auto bg-white md:hidden"
    >
      <aside class="flex min-h-full flex-col gap-8 p-6 pt-8">
        <!-- Encabezado y botón de cierre -->
        <div class="flex items-center justify-between gap-4">
          <span
            class="text-xs font-semibold uppercase tracking-widest text-black/50"
          >
            Navegación
          </span>

          <button
            type="button"
            class="flex items-center justify-center rounded-full p-3 text-black/60 transition-colors hover:bg-black/5 hover:text-black"
            aria-label="Cerrar navegación"
            @click="closeMobileMenu"
          >
            <Icon icon="lucide:x" class="h-5 w-5" />
          </button>
        </div>

        <!-- Imagen del proyecto -->
        <img
          class="h-[160px] w-full rounded-sm object-cover shadow-lg"
          :src="image"
          alt=""
        />

        <!-- Navegación del contenido -->
        <nav
          v-if="navigation.length"
          class="flex flex-col gap-4"
          aria-label="Navegación del contenido"
        >
          <span
            class="text-xs font-semibold uppercase tracking-widest text-black/50"
          >
            Sobre el Proyecto
          </span>

          <div class="flex flex-col gap-4">
            <a
              v-for="item in navigation"
              :key="item.id"
              :href="`#${item.id}`"
              class="flex items-center gap-3 py-1 text-sm text-black/60 transition-colors hover:text-black"
              @click="closeMobileMenu"
            >
              <Icon :icon="item.icon" class="sm-icon" />
              {{ item.title }}
            </a>
          </div>
        </nav>

        <div class="h-px w-full bg-black/10" />

        <!-- Más información -->
        <div class="flex flex-col gap-4">
          <span
            class="text-xs font-semibold uppercase tracking-widest text-black/50"
          >
            Más Información
          </span>

          <div class="flex flex-col gap-4 text-sm">
            <a
              href="/"
              class="flex items-center gap-3 text-black/60 transition-colors hover:text-black"
              @click="closeMobileMenu"
            >
              <Icon icon="lucide:house" class="sm-icon" />
              Inicio
            </a>

            <a
              href="/proyectos"
              class="flex items-center gap-3 text-black/60 transition-colors hover:text-black"
              @click="closeMobileMenu"
            >
              <Icon icon="lucide:folder" class="sm-icon" />
              Proyectos
            </a>
          </div>
        </div>

        <!-- Volver arriba -->
        <button
          type="button"
          class="flex items-center gap-3 text-sm text-black/60 transition-colors hover:text-black"
          @click="
            scrollToTop();
            closeMobileMenu();
          "
        >
          <Icon icon="lucide:arrow-up" class="sm-icon" />
          Volver arriba
        </button>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
