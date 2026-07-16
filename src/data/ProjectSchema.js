import stackSchema from "./StackSchema";

export default {
  type: "object",
  required: ["title", "domain", "href", "text", "src", "stack"],
  additionalProperties: true,
  properties: {
    title: { type: "string" },
    domain: { type: "string" },
    href: { type: "string" },
    text: { type: "string" },
    src: { type: "string" },
    stack: stackSchema,
  },
};
