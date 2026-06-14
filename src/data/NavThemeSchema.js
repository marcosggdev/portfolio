import NavbarThemeSchema from "./NavbarThemeSchema";

export default {
  type: "object",
  additionalProperties: false,
  required: ["backgroundColor", "textColor", "navbarTheme"],
  properties: {
    backgroundColor: { type: "string" },
    textColor: { type: "string" },
    navbarTheme: NavbarThemeSchema,
  },
};
