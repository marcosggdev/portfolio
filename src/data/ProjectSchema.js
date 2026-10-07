import stackSchema from "./StackSchema";

export default {
  type: "object",

  required: ["title", "domain", "href", "text", "src", "stack"],

  additionalProperties: true,

  properties: {
    title: {
      type: "string",
    },

    domain: {
      type: "string",
    },

    href: {
      type: "string",
    },

    projectHref: {
      type: "string",
    },

    text: {
      type: "string",
    },

    src: {
      type: "string",
    },

    stack: stackSchema,

    video: {
      type: "object",

      required: ["srcDesktop", "srcMobile", "timestamps"],

      additionalProperties: false,

      properties: {
        srcDesktop: {
          type: "string",
        },

        srcMobile: {
          type: "string",
        },

        timestamps: {
          type: "array",

          items: {
            type: "object",

            required: ["id", "start", "end", "title", "text"],

            additionalProperties: false,

            properties: {
              id: {
                type: "number",
              },

              start: {
                type: "number",
              },

              end: {
                type: "number",
              },

              title: {
                type: "string",
              },

              text: {
                type: "string",
              },
            },
          },
        },
      },
    },

    icon: {
      type: "string",
      description: "Icono del proyecto (ej: mdi:package-variant-closed)",
    },

    description: {
      type: "string",
      description: "Descripción breve del proyecto",
    },

    component: {
      type: ["string", "object"],
      description: "Componente Vue asociado al proyecto",
    },

    navigation: {
      type: "array",

      items: {
        type: "object",

        required: ["id", "title", "icon"],

        additionalProperties: false,

        properties: {
          id: {
            type: "string",
          },

          title: {
            type: "string",
          },

          icon: {
            type: "string",
          },
        },
      },
    },
  },
};
