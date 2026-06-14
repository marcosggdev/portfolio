import ajv from "./ajv";
import NavThemeSchema from "../data/NavThemeSchema";
import NavbarThemeSchema from "../data/NavbarThemeSchema";

export const NavValidator = ajv.compile(NavThemeSchema);
export const NavbarValidator = ajv.compile(NavbarThemeSchema);
