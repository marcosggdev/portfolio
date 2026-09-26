<script setup>
import ProjectEntry from "../../components/ProjectEntry.vue";
import ProjectSection from "../../components/ProjectSection.vue";
import Stack from "../../components/Stack.vue";
import { ProjectValidator } from "../../validation/ComponentValidators";
import mdoCorp from "../../assets/img/mdo.png";

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
    title="MDO Corp. S. L."
    subtitle="Construí desde cero la página oficial de la empresa, con Nuxt + Vue."
    :image="mdoCorp"
    :navigation="project.navigation"
  >
    <template #content>
      <ProjectSection id="descripcion" title="Descripción">
        <p class="text-[var(--dark-text)]">
          Se trata de uno de los proyectos más completos que he realizado, ya
          que fue un proyecto real y tuve que pulir cada apartado con cuidado,
          hacer testing de todo minuciosamente y planificar correctamente las
          distintas fases para no alargar el desarrollo más de lo previsto.
        </p>

        <p class="text-[var(--dark-text)]">
          Como resultado, tenemos la página de MDO Corp. S. L., una página
          reactiva y muy visual, con ambientación aérea y dinamismo, pero sin
          sacrificar el rendimiento. La página necesitó una optimización
          considerable, pero tras muchas pequeñas mejoras se consiguió mantener
          gran parte del estilo visual incluso en dispositivos antiguos o con
          pocos recursos.
        </p>

        <p class="text-[var(--dark-text)]">
          El frontend utiliza Nuxt y Vue, con GSAP para las animaciones
          avanzadas. También desarrollé un sistema propio de validación para el
          formulario de suscripción, integración con Supabase para la gestión de
          datos y un sistema de caché basado en hashes de versión para obtener
          los últimos precios y servicios disponibles.
        </p>
      </ProjectSection>

      <ProjectSection id="galeria" title="Galería">
        <p class="text-[var(--dark-text)]">
          La galería de este proyecto está centrada principalmente en el diseño
          visual y en algunos de los efectos utilizados en la página. Entre los
          elementos que más destacan se encuentran la ambientación mediante
          nubes animadas con GSAP y el hero principal, que utiliza un SVG como
          máscara para crear una composición más dinámica.
        </p>

        <p class="text-[var(--dark-text)]">
          Actualmente esta sección no cuenta con una presentación de vídeo como
          la disponible en otros proyectos, aunque la estructura de datos está
          preparada para poder añadirla posteriormente.
        </p>
      </ProjectSection>

      <ProjectSection id="observaciones" title="Observaciones">
        <h4 class="text-[var(--dark-subtitle)]">Dificultades que tuve</h4>

        <ul class="flex flex-col gap-4 pl-4 list-disc text-[var(--dark-text)]">
          <li>
            Mi punto flaco es el diseño, por lo que tuve que dedicar bastante
            tiempo a conseguir un resultado visual que me convenciera. Como no
            contábamos con un diseñador para la página, aprendí a utilizar Figma
            y profundicé en conceptos de diseño web. Esto hizo que tuviera que
            rediseñar varias partes de la interfaz durante el desarrollo.
          </li>

          <li>
            También dediqué bastante esfuerzo al formulario de suscripción a la
            newsletter. Quería que fuera reutilizable y tuviera una gestión
            manual de la sanitización y del estado reactivo de sus campos.
            Cuando añadí campos especiales, como el captcha, la complejidad
            aumentó considerablemente, pero finalmente conseguí completar la
            integración.
          </li>

          <li>
            Otro problema importante fue el hero de la página, que presenta
            problemas de compatibilidad en algunos navegadores Safari. A pesar
            de probar diferentes soluciones, es uno de los puntos que no llegué
            a resolver completamente.
          </li>
        </ul>

        <h4 class="text-[var(--dark-subtitle)]">Puntos fuertes</h4>

        <p class="text-[var(--dark-text)]">
          El proyecto me permitió poner en práctica mis conocimientos de
          frontend con Nuxt y Vue y trabajar con una aplicación real, con
          necesidades de rendimiento, validación, persistencia de datos y
          animaciones avanzadas.
        </p>

        <p class="text-[var(--dark-text)]">
          Especialmente interesantes fueron la integración de GSAP para crear
          una ambientación dinámica, el uso de SVG como máscara en el hero y el
          sistema de caché utilizado para reducir las consultas innecesarias a
          la base de datos.
        </p>
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
