<script setup>
import ProjectEntry from "../../components/ProjectEntry.vue";
import ProjectSection from "../../components/ProjectSection.vue";
import Stack from "../../components/Stack.vue";
import { ProjectValidator } from "../../validation/ComponentValidators";
import portfolio from "../../assets/img/portfolio.webp";
import VideoWithTimestamps from "../../components/VideoWithTimestamps.vue";

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
    title="Mi Portfolio"
    subtitle="SPA en Vue 3, con interfaz pulida y limpia, donde muestro mi perfil profesional."
    :image="portfolio"
    :navigation="project.navigation"
  >
    <template #content>
      <ProjectSection id="descripcion" title="Descripción">
        <p class="text-[var(--dark-text)]">
          Mi portfolio es un proyecto centrado en mí, donde muestro información
          sobre mis habilidades y conocimientos y sobre otros proyectos que he
          realizado. He tratado de hacer algo sencillo en cuanto al apartado
          técnico, pero con una interfaz pulida y limpia y pensando en la
          usabilidad y en la comodidad del usuario.
        </p>

        <p class="text-[var(--dark-text)]">
          Como resultado de varios días de trabajo, creé con éxito la página que
          estás visitando actualmente. Quería incluir una autoreferencia a este
          proyecto en el portfolio porque, al final, sigue siendo un proyecto
          web más que he completado.
        </p>
      </ProjectSection>

      <ProjectSection id="previsualizacion" title="Previsualización">
        <VideoWithTimestamps
          :src-desktop="project.video.srcDesktop"
          :src-mobile="project.video.srcMobile"
          :timestamps="project.video.timestamps"
        />
      </ProjectSection>

      <ProjectSection id="observaciones" title="Observaciones">
        <ul class="flex flex-col gap-4 pl-4 list-disc text-[var(--dark-text)]">
          <li>
            La página proyectos utiliza una estructura de rutas similar a la que
            se ve en CMSs como Wordpress, tras desarrollar un pequeño pero
            complejo sistema de gestión de rutas, utilizando layouts de Vue y
            código adicional para determinar información adicional sobre la ruta
            cargada y personalizar así la plantilla de cada página de proyecto.
          </li>

          <li>
            La estructura de navegación de la página es bastante compleja y me
            atasqué con un bug en los enlaces de navegación, que causaba que el
            scroll no se reiniciase a 0 (**volver al inicio**) al cambiar entre
            páginas. Además, añadir enlaces de ancla complicó ligeramente más el
            problema, pero fue resuelto con éxito realizando unos ajustes en el
            router de Vue.
          </li>

          <li>
            Lograr un diseño limpio y ligero, sin estar sobrecargado de
            elementos de interfaz pero con lo necesario para una buena
            usabilidad tomó bastante tiempo e iteraciones de diseños previos
            fallidos.
          </li>
        </ul>
      </ProjectSection>

      <Stack
        class="hidden md:grid"
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
  </ProjectEntry>
</template>
