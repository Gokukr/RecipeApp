/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: "#ecf0f1",
        gainsboro: "#d9d9d9",

        "pale-silver": "#ecf0f1",
        "midnight-blue": "#2c3e50",
        darkslategray: {
          100: "#2c3e50",
          200: "#333",
          300: "rgba(44, 62, 80, 0.9)",
        },
        black: "#000",
        white: "#fff",
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
  },
  plugins: [require("@tailwindcss/forms")],
};
