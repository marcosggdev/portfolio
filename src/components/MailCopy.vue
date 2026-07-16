<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const copied = ref(false);

const displayEmail = computed(() => {
  const [user, domain] = props.email.split("@");

  if (!domain) return props.email;

  return `${user}${String.fromCharCode(64)}${domain}`;
});

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(displayEmail.value);

    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("No se pudo copiar el correo:", err);
  }
}
</script>

<template>
  <div class="mail-copy">
    <input
      ref="inputRef"
      class="mail-copy__input w-fit"
      type="text"
      :value="displayEmail"
      readonly
      disabled
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="Correo electrónico"
    />

    <button
      class="mail-copy__button"
      type="button"
      @click="copyEmail"
      :title="copied ? '¡Copiado!' : 'Copiar correo'"
    >
      {{ copied ? "✓" : "Copiar" }}
    </button>
  </div>
</template>

<style scoped>
.mail-copy {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mail-copy__input {
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1rem;

  background: #fff;
  color: #6b7280; /* Gris para indicar que es de solo lectura */

  border: 1px solid #d1d5db;
  border-radius: 8px;

  font: inherit;

  cursor: default;
  user-select: none;
}

.mail-copy__input:disabled {
  opacity: 1; /* Evita el aspecto apagado por defecto */
  -webkit-text-fill-color: #6b7280; /* Safari */
  color: #6b7280;
  background: #fff;
}

.mail-copy__button {
  padding: 0.75rem 1.25rem;

  border: none;
  border-radius: 8px;

  background: var(--primary-color);
  color: #1d1d1d;

  font: inherit;
  font-weight: 500;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.mail-copy__button:hover {
  background: var(--primary-color-hover);
}

.mail-copy__button:active {
  transform: scale(0.98);
}

.mail-copy__button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.mail-copy__input:disabled {
  opacity: 1;
  -webkit-text-fill-color: #6b7280;
}
</style>
