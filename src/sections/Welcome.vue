<script setup>
import Section from "../components/Section.vue";
import Socials from "../components/Socials.vue";

import avatar from "../assets/img/avatar.jpg";
import Button from "../components/Button.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
  <Section size="sm" class="flex flex-col bg-[var(--light-bg)]">
    <div
      class="flex flex-col max-w-[1024px] ml-auto mr-auto w-full h-full isolate"
    >
      <div class="flex flex-col md:grid md:grid-cols-2 md:p-8 gap-16 md:p-16">
        <div class="flex flex-col gap-8 justify-center relative">
          <header class="flex flex-col gap-4">
            <img class="e-bg-icon rounded-full" :src="avatar" alt="" />
            <div class="flex flex-col">
              <h2>Marcos G.</h2>
              <Socials color-class="text-black" :expanded="true" />
            </div>
          </header>
          <main class="flex flex-col gap-8">
            <p>
              Me llamo Marcos G. y vivo en una zona rural Asturiana en el
              Concejo de Aller. Obtuve mi título de Técnico Superior en
              Desarrollo de Aplicaciones Web al terminar el CFGS DAW en el IES
              Bernaldo de Quirós, Mieres, y actualmente busco mi primer trabajo
              como desarrollador.
            </p>
            <div class="flex flex-row items-center gap-6">
              <Button background-color="black" color="white" variant="primary"
                >Ver Proyectos</Button
              >
              <Button color="black" variant="secondary">Descargar CV</Button>
            </div>
          </main>
        </div>
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-[max-content_auto] gap-2">
            <Icon class="bg-icon" icon="logos:vue" />
            <div class="flex flex-col gap-2">
              <h3>VueJS</h3>
              <p>
                Tras finalizar mis estudios, me especialicé en VueJS, que aporta
                reactividad y atomización a través de componentes reutilizables.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-[max-content_auto] gap-4">
            <Icon class="text-black bg-icon" icon="fa6-brands:wordpress" />
            <div class="flex flex-col">
              <h3>Wordpress</h3>
              <p>
                Realicé mis prácticas en una startup Ovetense, donde aprendí el
                ecosistema de Wordpress.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-[max-content_auto] gap-2">
            <div class="flex flex-col gap-2">
              <Icon class="bg-icon" icon="mdi:plus" />
            </div>
            <div class="flex flex-col gap-2">
              <h3>Otros</h3>
              <p>
                La tecnología avanza continuamente y sigo aprendiendo para
                adaptarme.
              </p>
              <ul class="flex flex-row gap-2">
                <li class="group relative">
                  <Icon class="md-icon" icon="logos:react" />
                  <span
                    class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    React
                  </span>
                </li>

                <li class="group relative">
                  <Icon class="md-icon" icon="logos:angular-icon" />
                  <span
                    class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Angular
                  </span>
                </li>

                <li class="group relative">
                  <Icon class="md-icon" icon="logos:laravel" />
                  <span
                    class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Laravel
                  </span>
                </li>

                <li class="group relative">
                  <Icon class="md-icon" icon="logos:java" />
                  <span
                    class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Java
                  </span>
                </li>

                <li class="group relative">
                  <Icon class="md-icon" icon="logos:spring-icon" />
                  <span
                    class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Spring Boot
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
