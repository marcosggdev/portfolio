<script setup>
import ProjectEntry from "../../components/ProjectEntry.vue";
import Stack from "../../components/Stack.vue";
import Gallery from "../../components/Gallery.vue";
import { ProjectValidator } from "../../validation/ComponentValidators";

defineProps({
  project: {
    type: Object,
    required: true,
    validator: ProjectValidator,
  },
});
</script>

<template>
  <ProjectEntry
    title="MDO Corp SL"
    subtitle="Construí desde cero la página oficial de la empresa, con Nuxt + Vue."
  >
    <template #content>
      <div class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Descripción</h3>
        <p class="text-[var(--dark-text)]">
          Se trata de uno de los proyectos más completos que he realizado, ya
          que fue un proyecto real y tuve que pulir cada apartado con cuidado,
          hacer testing de todo minuciosamente, y planificar correctamente las
          timelines para no alargar el proyecto más de lo previsto.
        </p>
        <p class="text-[var(--dark-text)]">
          Como resultado, tenemos la página de MDO Corp SL, una página reactiva
          muy visual, con ambientación aérea y dinamismo, pero sin sacrificar
          rendimiento. La página necesitó una optimización severa, pero tras
          muchas pequeñas optimizaciones, se logró mantener la mayor parte del
          estilo visual funcionando incluso en dispositivos viejos o lentos.
        </p>
        <p class="text-[var(--dark-text)]">
          La página utiliza Vue para manejar el Frontend, GSAP para animaciones
          avanzadas, un validador propio para formularios de suscripción, acceso
          a base de datos con Supabase donde yo mismo ideé también las
          estructuras de datos y los propios datos, un sistema de cacheado para
          obtener los últimos precios y servicios de la base de datos basado en
          hash de versión, y mucho más.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Dificultades que tuve</h3>
        <ul class="flex flex-col gap-4 pl-4 list-disc text-[var(--dark-text)]">
          <li>
            Mi punto flaco es el diseño, tengo que dedicar muchas horas para
            lograr resultados atractivos. Dado que no teníamos diseñador para la
            página, aprendí a usar Figma y sobre Diseño Web, lo que me permitió
            lograr un resultado aceptable para la página, pero tuve que
            rediseñar varias partes de la misma varias veces porque no me
            convencían.
          </li>
          <li>
            Por otra parte, me empeñe en añadir un formulario de suscripción a
            newsletter para registrar usuarios y quizá enviar información o
            publicidad a personas interesadas en el futuro, sin embargo, hice
            manualmente la sanitización y estado reactivo de los campos del
            formulario, y al mismo tiempo intenté hacerlo genérico, basado en
            componentes reutilizables. Eso alcanzó una complejidad muy grande
            antes de que me diese cuenta. La integración con campos especiales
            de un formulario, como un captcha, hizo muy difícil este apartado,
            pero finalmente se logró.
          </li>
          <li>
            Por último, quisiera mencionar el problema con el hero de la página,
            ya que no parece funcionar en navegadores Safari. Es un problema que
            nunca llegué a resolver realmente, a pesar de intentarlo de varias
            maneras.
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Puntos fuertes</h3>
        <p class="text-[var(--dark-text)]">
          El proyecto me permitió poner en práctica mis habilidades Frontend con
          Nuxt + Vue, y diría que gracias a él me considero especializado en
          Vue. Por el momento, es mi librería frontend favorita para reactividad
          y uso de componentes.
        </p>
        <p class="text-[var(--dark-text)]">
          En la galería podrás ver imágenes y vídeos ligeros sobre las partes
          del diseño que más me gustan, pero particularmente el efecto de nubes
          con gsap y el hero que utiliza un svg como mascara me parecen muy
          interesantes.
        </p>
      </div>
      <Gallery :data="project.galleryData" />
      <Stack
        class="hidden md:block"
        :stack="project.stack"
        :cols="8"
        color-class="text-black"
      />
      <Stack
        class="md:hidden"
        :stack="project.stack"
        :cols="3"
        color-class="text-black"
      />
    </template>
    <template #aside> aside </template>
  </ProjectEntry>
</template>
