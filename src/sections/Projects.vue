<script setup>
import Section from "../components/Section.vue";
import logo from "../assets/img/icons/logo.png";
import { Icon } from "@iconify/vue";
import Button from "../components/Button.vue";
import mdo from "../assets/img/mdo-showcase.png";
import UnderlineLink from "../components/UnderlineLink.vue";
import fallback from "../assets/img/fallback.png";
import SkewHoverCarousel from "../components/SkewHoverCarousel.vue";

import FeaturedProjects from "../data/FeaturedProjects";
</script>

<template>
  <Section class="flex flex-col" size="bg" :has-padding="false">
    <div class="flex flex-col gap-4 ml-auto mr-auto w-full h-full flex-1">
      <div class="grid grid-cols-[40%_auto] h-full flex-1">
        <!--left col-->
        <div class="flex flex-col gap-8 p-16">
          <div class="grid grid-cols-[max-content_auto] gap-2 items-start">
            <img class="e-bg-icon" :src="logo" alt="" />
          </div>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <h3>Mis proyectos destacados</h3>
              <p>
                Aquí tienes una colección de mis proyectos más destacados. Se
                trata de proyectos web ya sea reales o ficticios que considero
                completos.
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

        <!--right col-->
        <div class="flex flex-col gap-8">
          <SkewHoverCarousel :items="FeaturedProjects" />
        </div>
      </div>
    </div>
  </Section>
</template>
