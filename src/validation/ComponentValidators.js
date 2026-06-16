import ajv from "./ajv";
import NavThemeSchema from "../data/NavThemeSchema";
import NavbarThemeSchema from "../data/NavbarThemeSchema";
import StackSchema from "../data/StackSchema";
import SkewHoverCarouselSchema from "../data/SkewHoverCarouselSchema";

export const NavValidator = ajv.compile(NavThemeSchema);
export const NavbarValidator = ajv.compile(NavbarThemeSchema);
export const StackValidator = ajv.compile(StackSchema);
export const SkewHoverCarouselValidator = ajv.compile(SkewHoverCarouselSchema);
