export default {
  type: "object",
  additionalProperties: false,
  required: ["images", "hotspots"],
  properties: {
    images: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
      },
    },
    hotspots: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["x", "y", "content", "clickEffect"],
        properties: {
          imageIndex: { type: "number" },
          x: {
            type: "number",
          },
          y: {
            type: "number",
          },
          content: {
            type: "string",
          },
          clickEffect: {
            type: "string",
            enum: ["none", "zoomIn", "zoomOut", "focus", "highlight"],
          },
        },
      },
    },
  },
};
