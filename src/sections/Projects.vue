<script setup>
import Section from "../components/Section.vue";
import logo from "../assets/img/icons/logo.png";
import { Icon } from "@iconify/vue";
import Button from "../components/Button.vue";
import mdo from "../assets/img/mdo-showcase.png";
import UnderlineLink from "../components/UnderlineLink.vue";
import fallback from "../assets/img/fallback.png";
</script>

<template>
  <Section size="bg">
    <main class="flex flex-col gap-4 max-w-[1024px] ml-auto mr-auto">
      <div class="grid grid-cols-2 gap-16">
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-[max-content_auto] gap-2 items-start">
            <img class="e-bg-icon" :src="logo" alt="" />
            <div class="flex flex-col">
              <h2>Proyectos</h2>
              <a class="flex flex-row items-center gap-1" href="#"
                ><Icon
                  class="sm-icon"
                  icon="logos:github-icon"
                />@marcosggdev</a
              >
            </div>
          </div>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <h3>Mis proyectos destacados</h3>
              <p>
                Aquí tienes una colección de mis proyectos más destacados. Si
                quieres verlos todos, haz click en el siguiente enlace
              </p>
            </div>
            <Button
              variant="primary"
              type="link"
              href="/proyectos"
              color="white"
              background-color="black"
              >Ver Todos</Button
            >
          </div>
        </div>
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-3 gap-4">
            <a
              href="/proyectos/mdo-corp-sl"
              class="w-full flex flex-col justify-end hover:translate-y-[-5px] transition shadow-lg"
            >
              <img
                class="inset-0 w-full h-full object-cover -z-1 aspect-[1/2]"
                :src="mdo"
                alt=""
              />
              <h5 class="text-center bg-black text-white pt-1 pb-1 p-2">
                MDO Corp. SL
              </h5>
            </a>
            <div class="w-full flex flex-col justify-end shadow-lg">
              <img
                class="inset-0 w-full h-full object-cover -z-1 aspect-[1/2]"
                :src="fallback"
                alt=""
              />
              <h5 class="text-center bg-black text-white pt-1 pb-1 p-2">
                Próximamente
              </h5>
            </div>
            <div class="w-full flex flex-col justify-end shadow-lg">
              <img
                class="inset-0 w-full h-full object-cover -z-1 aspect-[1/2]"
                :src="fallback"
                alt=""
              />
              <h5 class="text-center bg-black text-white pt-1 pb-1 p-2">
                Próximamente
              </h5>
            </div>
          </div>
          <small
            >(*) Los proyectos listados aquí son proyectos más o menos sencillos
            pero completos, que me parecen adecuados para mostrar en mi
            Portfolio. Sin embargo, tengo más proyectos privados o incompletos
            que no aparecen.</small
          >
        </div>
      </div>
    </main>
  </Section>
</template>
