import ajv from "./ajv";
import NavThemeSchema from "../data/NavThemeSchema";
import NavbarThemeSchema from "../data/NavbarThemeSchema";
import StackSchema from "../data/StackSchema";
import SkewHoverCarouselSchema from "../data/SkewHoverCarouselSchema";
import BreadcrumbsSchema from "../data/BreadcrumbsSchema";

export const NavValidator = ajv.compile(NavThemeSchema);
export const NavbarValidator = ajv.compile(NavbarThemeSchema);
export const StackValidator = ajv.compile(StackSchema);
export const SkewHoverCarouselValidator = ajv.compile(SkewHoverCarouselSchema);
export const BreadcrumbsValidator = ajv.compile(BreadcrumbsSchema);
