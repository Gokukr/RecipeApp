/** @type {import('tailwindcss').Config} */
import { screens as _screens } from 'tailwindcss/defaultTheme';

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      gainsboro: "#d9d9d9",
      primary: {
        100: "#2c3e50",
        200: "#333",
        300: "rgba(44, 62, 80, 0.9)",
      },
      black: "#000",
      white: "#fff",
      bg: "#F9F9F9",
      textbg: "#EAEBEC",
      secondary: "#ff9900",
    },
    spacing: {},
    fontFamily: {
      "open-sans": "'Open Sans'",
      inter: "Inter",
      "mystery-quest": "'Mystery Quest'",
    },
    borderRadius: {
      "3xs": "10px",
    },
  },
  fontSize: {
    "5xl": "24px",
    lgi: "19px",
    "13xl": "32px",
    "7xl": "26px",
    xs: "12px",
    xl: "20px",
    base: "16px",
    "29xl": "48px",
    "10xl": "29px",
    "19xl": "38px",
    "21xl": "40px",
    inherit: "inherit",
  },
  screens: {
    'xs': '475px',
    ..._screens,
  },
};
export const corePlugins = {
  preflight: false,
};
export const plugins = [require("@tailwindcss/forms")];