<script setup>
import ProjectEntry from "../../components/ProjectEntry.vue";
import Stack from "../../components/Stack.vue";
import Gallery from "../../components/Gallery.vue";
import { ProjectValidator } from "../../validation/ComponentValidators";
import portfolio from "../../assets/img/portfolio.png";
import portfolioPreviewDesktop from "../../assets/vid/portfolio-preview-desktop.mp4";
import portfolioPreviewMobile from "../../assets/vid/portfolio-preview-mobile.mp4";
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
  >
    <template #content>
      <div id="descripcion" class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Descripción</h3>
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
      </div>
      <div id="galeria">
        <VideoWithTimestamps
          :src-desktop="portfolioPreviewDesktop"
          :src-mobile="portfolioPreviewMobile"
          :timestamps="[
            {
              id: 1,
              start: 0,
              end: 15,
              title: 'Inicio',
              text: 'Aquí aparece la primera información.',
            },
            {
              id: 2,
              start: 15,
              end: 35,
              title: 'Segundo punto',
              text: 'Información correspondiente al segundo intervalo.',
            },
            {
              id: 3,
              start: 72,
              end: 78,
              title: 'Tercer punto',
              text: 'Otra información.',
            },
          ]"
        />
      </div>
      <div id="dificultades" class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Dificultades que tuve</h3>
        <ul class="flex flex-col gap-4 pl-4 list-disc text-[var(--dark-text)]">
          <li>
            La página proyectos utiliza una estructura de rutas similar a la que
            se ve en CMS's como Wordpress, tras desarrollar un pequeó pero
            complejo sistema de enrutamiento, utilizando layouts de Vue y código
            adicional para determinar información adicional sobre la ruta
            cargada y personalizar así la plantilla de cada página de proyecto.
          </li>
          <li>
            La estructura de navegación de la página es bastante compleja y me
            atasqué con un bug en los enlaces de navegación, que causaba que el
            scroll no se reiniciase a 0 (subir arriba del todo) al cambiar entre
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
      </div>
      <div id="puntos-fuertes" class="flex flex-col gap-4">
        <h3 class="text-[var(--dark-subtitle)]">Puntos fuertes</h3>
        <ul class="flex flex-col gap-4 pl-4 list-disc text-[var(--dark-text)]">
          <li>
            Me esforcé activamente en hacer un diseño ligero pero agradable
            visualmente, sin estar sobrecargado de elementos y con un orden
            elegante en el contenido.
          </li>
          <li>
            El componente de vídeo que creé para añadir en las entradas de los
            proyectos me gusta mucho y me parece muy original y adecuado para el
            portfolio. Permite previsualizar una página sin necesidad de
            visitarla y añadir etiquetas de tiempo según lo que se está viendo.
            Me parece un componente genial para el portfolio, porque muchos de
            mis proyectos no tienen host activo y con el componente puedo
            mostrar las páginas casi en su totalidad igualmente.
          </li>
        </ul>
      </div>

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
