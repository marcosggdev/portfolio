export default {
  type: "object",
  additionalProperties: false,
  required: ["color", "hoverColor", "currentColor"],
  properties: {
    color: { type: "string" },
    hoverColor: { type: "string" },
    currentColor: { type: "string" },
  },
};
