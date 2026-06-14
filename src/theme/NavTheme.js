const thresholdTheme = {
  backgroundColor: "--nav-threshold-bg-color",
  textColor: "--nav-threshold-text-color",
  navbarTheme: {
    color: "--nav-threshold-navbar-color",
    hoverColor: "--nav-threshold-navbar-hover-color",
    currentColor: "--nav-threshold-navbar-current-color",
  },
};

const nonThresholdTheme = {
  backgroundColor: "--nav-non-threshold-bg-color",
  textColor: "--nav-non-threshold-text-color",
  navbarTheme: {
    color: "--nav-non-threshold-navbar-color",
    hoverColor: "--nav-non-threshold-navbar-hover-color",
    currentColor: "--nav-non-threshold-navbar-current-color",
  },
};

export const navThemeVariations = [
  { thresholdTheme, nonThresholdTheme }, //default for nav
];
