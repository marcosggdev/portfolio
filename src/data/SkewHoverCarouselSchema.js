export default {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["image", "href", "title", "subtitle", "text", "brightness"],
    properties: {
      image: {
        type: "string",
        minLength: 1,
      },
      href: {
        type: "string",
        minLength: 1,
      },
      title: {
        type: "string",
        minLength: 1,
      },
      subtitle: {
        type: "string",
      },
      text: {
        type: "string",
      },
      brightness: {
        type: "number",
        minimum: 0,
        maximum: 1,
      },
    },
  },
};
