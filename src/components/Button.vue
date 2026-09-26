<script setup>
import { ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import cv from "@/assets/files/cv.pdf";

const props = defineProps({
  action: {
    type: String,
    default: "",
  },

  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary"].includes(value),
  },

  effects: {
    type: Array,
    default: () => [],
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

  showActionSuccessMessage: {
    type: Boolean,
    default: false,
  },

  showActionFailMessage: {
    type: Boolean,
    default: false,
  },

  actionSuccessMessage: {
    type: String,
    default: "Acción realizada correctamente.",
  },

  actionFailMessage: {
    type: String,
    default: "No se ha podido completar la acción.",
  },

  actionTimeout: {
    type: Number,
    default: 8000,
  },

  messageDuration: {
    type: Number,
    default: 4000,
  },

  processingDuration: {
    type: Number,
    default: 500,
  },

  debug: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const isLoading = ref(false);
const actionMessage = ref("");
const actionStatus = ref(null);

let actionTimeoutId = null;
let messageTimeoutId = null;

/*
 * ============================================================
 * ACCIONES
 * ============================================================
 */

const downloadCV = async () => {
  const url = cv;

  console.info("[Button:downloadCV] Iniciando descarga", {
    url,
  });

  const response = await fetch(url, {
    cache: "no-store",
  });

  console.info("[Button:downloadCV] Respuesta recibida", {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    contentType: response.headers.get("content-type"),
    contentLength: response.headers.get("content-length"),
  });

  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }

  const blob = await response.blob();

  console.info("[Button:downloadCV] Blob recibido", {
    type: blob.type,
    size: blob.size,
  });

  if (!blob.size) {
    throw new Error("EMPTY_FILE");
  }

  /*
   * Comprobamos que realmente estamos recibiendo un PDF.
   *
   * Un PDF válido comienza con:
   * %PDF-
   */
  const header = await blob.slice(0, 5).text();

  console.info("[Button:downloadCV] Cabecera del archivo", {
    header,
  });

  if (header !== "%PDF-") {
    throw new Error("INVALID_PDF");
  }

  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = "cv.pdf";

  document.body.appendChild(link);

  console.info("[Button:downloadCV] Ejecutando descarga", {
    blobUrl,
    filename: link.download,
  });

  link.click();

  link.remove();

  /*
   * No revocamos inmediatamente el Blob URL.
   * Damos tiempo al navegador para iniciar la descarga.
   */
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 1000);

  console.info("[Button:downloadCV] Descarga iniciada correctamente");

  return true;
};

/*
 * Todas las acciones disponibles para Button.vue.
 *
 * IMPORTANTE:
 * No usamos eval(), window[] ni ejecución dinámica.
 * Solo pueden ejecutarse funciones registradas aquí.
 */
const actions = {
  downloadCV,
};

/*
 * ============================================================
 * DEBUG
 * ============================================================
 */

const debugLog = (...args) => {
  if (props.debug) {
    console.info("[Button]", ...args);
  }
};

const debugWarn = (...args) => {
  if (props.debug) {
    console.warn("[Button]", ...args);
  }
};

/*
 * ============================================================
 * UTILIDADES
 * ============================================================
 */

const wait = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const clearActionTimeout = () => {
  if (actionTimeoutId) {
    clearTimeout(actionTimeoutId);
    actionTimeoutId = null;
  }
};

const clearMessageTimeout = () => {
  if (messageTimeoutId) {
    clearTimeout(messageTimeoutId);
    messageTimeoutId = null;
  }
};

const clearActionMessage = () => {
  clearMessageTimeout();

  actionMessage.value = "";
  actionStatus.value = null;
};

const showActionMessage = (status, message) => {
  clearMessageTimeout();

  actionStatus.value = status;
  actionMessage.value = message;

  messageTimeoutId = setTimeout(() => {
    actionMessage.value = "";
    actionStatus.value = null;
    messageTimeoutId = null;
  }, props.messageDuration);
};

/*
 * ============================================================
 * EJECUCIÓN DE ACCIONES
 * ============================================================
 */

const executeAction = () => {
  if (!props.action) {
    console.warn("[Button] No se ha definido ninguna acción.");

    return Promise.resolve();
  }

  const action = actions[props.action];

  if (typeof action !== "function") {
    throw new Error(`UNKNOWN_ACTION:${props.action}`);
  }

  debugLog("Ejecutando acción:", props.action);

  return action();
};

/*
 * ============================================================
 * CLICK
 * ============================================================
 */

const handleClick = async (event) => {
  debugLog("CLICK recibido.", {
    type: props.type,
    action: props.action,
    href: props.href,
    isTrusted: event?.isTrusted,
  });

  /*
   * ============================================================
   * LINK
   * ============================================================
   *
   * Los botones de navegación no necesitan action.
   */
  if (props.type === "link") {
    debugLog("Botón de navegación.", {
      href: props.href,
    });

    try {
      await router.push(props.href);

      debugLog("Navegación completada.", {
        href: props.href,
      });
    } catch (error) {
      console.error("[Button] Error navegando:", error);
    }

    return;
  }

  /*
   * ============================================================
   * EVITAR DOBLE EJECUCIÓN
   * ============================================================
   */

  if (isLoading.value) {
    debugWarn("Click ignorado porque la acción ya está en proceso.");

    return;
  }

  /*
   * ============================================================
   * BUTTON SIN ACTION
   * ============================================================
   */

  if (!props.action) {
    console.warn("[Button] Se ha pulsado un botón sin action definida.", {
      type: props.type,
      action: props.action,
    });

    return;
  }

  /*
   * ============================================================
   * ACTION DESCONOCIDA
   * ============================================================
   */

  if (typeof actions[props.action] !== "function") {
    console.error(`[Button] La acción "${props.action}" no existe.`, {
      requestedAction: props.action,
      availableActions: Object.keys(actions),
    });

    if (props.showActionFailMessage) {
      showActionMessage("error", props.actionFailMessage);
    }

    return;
  }

  /*
   * ============================================================
   * PROCESAMIENTO
   * ============================================================
   */

  clearActionMessage();
  clearActionTimeout();

  isLoading.value = true;

  const startTime = Date.now();

  debugLog("Procesamiento iniciado.", {
    action: props.action,
    processingDuration: props.processingDuration,
    actionTimeout: props.actionTimeout,
  });

  try {
    /*
     * Ejecutamos la acción inmediatamente.
     */
    debugLog("Ejecutando acción:", props.action);

    let actionResult;

    try {
      actionResult = executeAction();

      debugLog("Acción ejecutada.", {
        action: props.action,
        result: actionResult,
        resultType: typeof actionResult,
        isPromise: actionResult instanceof Promise,
      });
    } catch (error) {
      console.error(
        `[Button] La acción "${props.action}" ha lanzado una excepción:`,
        error,
      );

      throw error;
    }

    const actionPromise = Promise.resolve(actionResult);

    /*
     * TIMEOUT
     */
    const timeoutPromise = new Promise((_, reject) => {
      actionTimeoutId = setTimeout(() => {
        console.warn(
          `[Button] La acción "${props.action}" ha superado el timeout de ${props.actionTimeout}ms.`,
        );

        reject(new Error("ACTION_TIMEOUT"));
      }, props.actionTimeout);
    });

    const result = await Promise.race([actionPromise, timeoutPromise]);

    debugLog("Acción resuelta.", {
      action: props.action,
      result,
      elapsed: `${Date.now() - startTime}ms`,
    });

    /*
     * Permitir que una acción indique fallo explícitamente.
     */
    if (result === false) {
      console.warn(`[Button] La acción "${props.action}" ha devuelto false.`);

      throw new Error("ACTION_FAILED");
    }

    /*
     * Duración mínima de procesamiento.
     */
    const elapsed = Date.now() - startTime;

    const remainingTime = Math.max(0, props.processingDuration - elapsed);

    if (remainingTime > 0) {
      await wait(remainingTime);
    }

    debugLog("Acción completada correctamente.", {
      action: props.action,
      totalElapsed: `${Date.now() - startTime}ms`,
    });

    if (props.showActionSuccessMessage) {
      showActionMessage("success", props.actionSuccessMessage);
    }
  } catch (error) {
    if (error?.message === "ACTION_TIMEOUT") {
      console.warn(`[Button] Timeout en la acción "${props.action}".`);
    } else if (error?.message === "ACTION_FAILED") {
      console.warn(
        `[Button] La acción "${props.action}" ha indicado un fallo.`,
      );
    } else {
      console.error(`[Button] Error ejecutando "${props.action}":`, error);
    }

    if (props.showActionFailMessage) {
      const message =
        error?.message === "ACTION_TIMEOUT"
          ? "La acción está tardando demasiado."
          : props.actionFailMessage;

      showActionMessage("error", message);
    }
  } finally {
    clearActionTimeout();

    isLoading.value = false;

    debugLog("Procesamiento finalizado.", {
      action: props.action,
      totalElapsed: `${Date.now() - startTime}ms`,
    });
  }
};

/*
 * ============================================================
 * CLEANUP
 * ============================================================
 */

onUnmounted(() => {
  clearActionTimeout();
  clearMessageTimeout();
});
</script>

<template>
  <div class="relative w-fit">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="actionMessage"
        role="status"
        class="absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[280px] -translate-x-1/2 rounded-md bg-black/85 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm"
      >
        {{ actionMessage }}
      </div>
    </Transition>

    <button
      type="button"
      :style="{
        '--background-color': backgroundColor,
        '--color': color,
      }"
      :disabled="isLoading"
      @click.stop="handleClick"
      class="isolate relative w-fit cursor-pointer rounded-lg p-4 pt-2 pb-2 transition ease-out hover:scale-[1.05] active:scale-[1] focus:scale-[1] disabled:cursor-wait disabled:hover:scale-[1]"
      :class="[variant]"
    >
      <div
        class="background absolute inset-0 -z-1 h-full w-full rounded-lg transition-all duration-300 ease-out"
        :class="[variant, effects.includes('crystal') ? 'crystal' : '']"
      ></div>

      <div
        class="transition-all duration-200"
        :class="{
          'blur-[1.5px] opacity-70': isLoading,
        }"
      >
        <slot />
      </div>
    </button>
  </div>
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
