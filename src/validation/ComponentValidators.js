import ajv from "./ajv";
import NavThemeSchema from "../data/NavThemeSchema";
import NavbarThemeSchema from "../data/NavbarThemeSchema";
import StackSchema from "../data/StackSchema";

export const NavValidator = ajv.compile(NavThemeSchema);
export const NavbarValidator = ajv.compile(NavbarThemeSchema);
export const StackValidator = ajv.compile(StackSchema);
