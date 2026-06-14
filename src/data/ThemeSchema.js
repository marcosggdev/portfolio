export default {
  type: "object",
  additionalProperties: false,
  required: ["navTheme", "navbarTheme"],
  properties: {
    navTheme: NavThemeSchema,
    navbarTheme: NavbarThemeSchema,
  },
};
