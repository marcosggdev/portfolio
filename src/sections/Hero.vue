<script setup>
import Section from "../components/Section.vue";
import hero from "../assets/img/hero.jpg";
import Button from "../components/Button.vue";

const props = defineProps({
  hasPadding: { type: Boolean, default: true },
  backgroundImage: { type: String, default: "" },
  backgroundBrightness: { type: Number, default: 0.4 },
  size: { type: String, default: "md" },
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
    <div
      class="flex flex-row gap-2 items-center justify-center w-full h-full absolute inset-0 w-full h-full"
    >
      <div
        class="flex flex-col gap-8 max-w-[1024px] items-center justify-center"
      >
        <slot>
          <h2 class="text-center">
            Bienvenid@ a mi portfolio. Aquí podrás saber más sobre mí y sobre
            mis trabajos y experiencia
          </h2>
          <div class="flex flex-row items-center gap-4">
            <Button
              type="link"
              href="/proyectos"
              variant="secondary"
              :effects="['crystal']"
              >Ver Proyectos</Button
            >
            <Button variant="secondary" :effects="['crystal']"
              >Descargar CV</Button
            >
          </div>
        </slot>
      </div>
    </div>
  </Section>
</template>
