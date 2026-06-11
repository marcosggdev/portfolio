<script setup>
import { computed } from "vue";
import avatar from "../assets/img/icons/avatar.png";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import UnderlineLink from "./UnderlineLink.vue";
import Button from "./Button.vue";
import Socials from "./Socials.vue";

const currentRoute = useRoute();
const router = useRouter();
const routes = router.getRoutes();

const currentLinkStyle =
  "text-[var(--primary-color)] hover:text-[var(--primary-color-hover)]";

const notCurrentLinkStyle =
  "text-[var(--light-text)] hover:text-[var(--light-text-hover)]";

const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/files/cv.pdf";
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<template>
  <nav class="flex flex-row items-center p-2 justify-between pl-4 pr-4 w-full">
    <div class="flex flex-row gap-2">
      <img class="bg-icon" :src="avatar" alt="" />
      <div class="flex flex-col gap-2">
        <p class="text-white">marcosggdev</p>
        <Socials />
      </div>
    </div>
    <div class="flex flex-row items-center gap-4">
      <ul class="flex flex-row gap-2 w-fit">
        <UnderlineLink
          v-for="route in routes"
          :key="route.path"
          :href="route.path"
          :color="
            currentRoute.path === route.path
              ? 'text-[var(--light-text-hover)]'
              : 'text-[var(--light-text)] hover:text-[var(--light-text-hover)]'
          "
          class="flex flex-row items-center gap-1"
          :class="
            currentRoute.path === route.path
              ? currentLinkStyle
              : notCurrentLinkStyle
          "
          >{{ route.name }}</UnderlineLink
        >
      </ul>
      <Button :callback="downloadCV" variant="secondary">
        <div class="flex flex-row items-center gap-2">
          <span>CV</span>
          <Icon icon="material-symbols:download" class="sm-icon" />
        </div>
      </Button>
    </div>
  </nav>
</template>
