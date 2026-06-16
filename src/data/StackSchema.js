export default {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["icon", "text"],
    properties: {
      icon: {
        type: "string",
      },
      text: {
        type: "string",
      },
    },
  },
};
