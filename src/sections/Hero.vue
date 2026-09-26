<script setup>
import Section from "../components/Section.vue";
import Button from "../components/Button.vue";

const props = defineProps({
  hasPadding: {
    type: Boolean,
    default: true,
  },

  backgroundImage: {
    type: String,
    default: "",
  },

  backgroundBrightness: {
    type: Number,
    default: 0.4,
  },

  size: {
    type: String,
    default: "md",
  },
});
</script>

<template>
  <Section
    class="text-white"
    :has-padding="hasPadding"
    :background-image="backgroundImage"
    :background-brightness="backgroundBrightness"
    :size="size"
  >
    <div class="flex h-full w-full flex-row items-center justify-center">
      <div
        class="flex max-w-[1024px] flex-col items-center justify-center gap-8"
      >
        <slot>
          <h1>Título</h1>

          <h2>Subtítulo</h2>

          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
            commodi consequuntur aspernatur vel excepturi.
          </h4>

          <div
            class="flex flex-row flex-wrap items-center justify-center gap-4"
          >
            <Button
              type="link"
              href="/proyectos"
              variant="secondary"
              :effects="['crystal']"
            >
              Ver Proyectos
            </Button>

            <Button
              action="downloadCV"
              variant="secondary"
              :effects="['crystal']"
              :show-action-success-message="true"
              :show-action-fail-message="true"
              action-success-message="CV descargado correctamente."
              action-fail-message="No se ha podido descargar el CV."
            >
              Descargar CV
            </Button>
          </div>
        </slot>
      </div>
    </div>
  </Section>
</template>
