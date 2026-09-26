<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section :id="id" class="flex flex-col gap-4">
    <h3 class="text-[var(--dark-subtitle)]">
      {{ title }}
    </h3>

    <slot />
  </section>
</template>
