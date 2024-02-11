/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "pale-silver": "#ecf0f1",
        "midnight-blue": "#2c3e50",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
