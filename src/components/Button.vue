<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import loading from "../assets/img/gifs/loading.gif";

const props = defineProps({
  callback: {
    type: Function,
    default: () => Promise.resolve(),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary"].includes(value),
  },
  effects: {
    type: Array,
    default: [],
    validator: (value) => value.every((item) => typeof item === "string"),
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  color: {
    type: String,
    default: "white",
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "link"].includes(value),
  },
  href: {
    type: String,
    default: "#",
  },
});

const router = useRouter();
const focused = ref(false);
const isLoading = ref(false);

const handleClick = async () => {
  if (props.type === "button") {
    if (isLoading.value) return;

    isLoading.value = true;

    setTimeout(async () => {
      try {
        await props.callback();
      } finally {
        isLoading.value = false;
      }
    }, 500);
  } else if (props.type === "link") {
    router.push(props.href);
  }
};
</script>

<template>
  <button
    :style="{
      '--background-color': backgroundColor,
      '--color': color,
    }"
    @click="handleClick"
    @focusin="focused = true"
    @focusout="focused = false"
    class="isolate relative p-4 pt-2 pb-2 hover:scale-[1.05] active:scale-[1] focus:scale-[1] transition ease-out rounded-lg cursor-pointer w-fit"
    :class="[variant]"
  >
    <div
      class="background absolute inset-0 w-full h-full rounded-lg -z-1 transition-all duration-300 ease-out"
      :class="[variant, effects.includes('crystal') ? 'crystal' : '']"
    ></div>

    <!-- content -->
    <div :style="isLoading ? 'filter: blur(1px)' : ''">
      <slot />
    </div>

    <!-- loading overlay -->
    <img
      v-if="isLoading"
      class="absolute inset-0 m-auto sm-icon"
      :src="loading"
      alt="loading"
    />
  </button>
</template>

<style scoped>
.primary {
  color: var(--color);
}

.primary .background {
  border: none;
  background-color: var(--background-color);
}

.secondary {
  color: var(--color);
}

.secondary .background {
  border: 1px solid var(--color);
  background-color: transparent;
}

.crystal {
  backdrop-filter: blur(5px);
  filter: drop-shadow(0 0 3px black);
}
</style>
