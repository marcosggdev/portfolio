<script setup>
import { computed, ref } from "vue";
import { ProjectGalleryValidator } from "../validation/ComponentValidators";

const props = defineProps({
  data: {
    type: Object,
    validator: ProjectGalleryValidator,
  },
});

const currentIndex = ref(0);
const selectedHotspot = ref(null);

const visibleHotspots = computed(() =>
  props.data.hotspots.filter(
    (hotspot) => hotspot.imageIndex === currentIndex.value,
  ),
);

const isFirstSlide = computed(() => currentIndex.value === 0);

const isLastSlide = computed(
  () => currentIndex.value === props.data.images.length - 1,
);

const openHotspot = (hotspot) => {
  selectedHotspot.value = hotspot;
};

const closeHotspot = () => {
  selectedHotspot.value = null;
};

const setSlide = (index) => {
  currentIndex.value = index;
  selectedHotspot.value = null;
};

const nextSlide = () => {
  if (isLastSlide.value) {
    return;
  }

  setSlide(currentIndex.value + 1);
};

const previousSlide = () => {
  if (isFirstSlide.value) {
    return;
  }

  setSlide(currentIndex.value - 1);
};
</script>

<template>
  <div class="relative w-full overflow-hidden">
    <div class="relative">
      <img
        :src="data.images[currentIndex]"
        alt=""
        class="w-full h-auto block"
      />

      <button
        v-for="(hotspot, index) in visibleHotspots"
        :key="index"
        class="absolute w-6 h-6 rounded-full bg-white border border-black cursor-pointer -translate-x-1/2 -translate-y-1/2"
        :style="{
          left: `${hotspot.x}px`,
          top: `${hotspot.y}px`,
        }"
        @click="openHotspot(hotspot)"
      >
        +
      </button>
    </div>

    <div
      class="absolute top-0 right-0 h-full overflow-hidden transition-all duration-300 bg-white/40 shadow-lg"
      style="backdrop-filter: blur(10px)"
      :class="selectedHotspot ? 'w-1/2 p-6' : 'w-0 p-0'"
    >
      <button
        v-if="selectedHotspot"
        class="mb-4 cursor-pointer"
        @click="closeHotspot"
      >
        ×
      </button>

      <div v-if="selectedHotspot" v-html="selectedHotspot.content" />
    </div>

    <div
      v-if="data.images.length > 1"
      class="flex items-center justify-center gap-4 mt-6"
    >
      <button
        class="transition-opacity"
        :class="isFirstSlide ? 'opacity-30 cursor-default' : 'cursor-pointer'"
        :disabled="isFirstSlide"
        @click="previousSlide"
      >
        ←
      </button>

      <div class="flex items-center gap-3">
        <button
          v-for="(_, index) in data.images"
          :key="index"
          class="w-3 h-3 rounded-full transition-all cursor-pointer"
          :class="
            currentIndex === index
              ? 'bg-black scale-125'
              : 'bg-black/30 hover:bg-black/60'
          "
          @click="setSlide(index)"
        />
      </div>

      <button
        class="transition-opacity"
        :class="isLastSlide ? 'opacity-30 cursor-default' : 'cursor-pointer'"
        :disabled="isLastSlide"
        @click="nextSlide"
      >
        →
      </button>
    </div>
  </div>
</template>
