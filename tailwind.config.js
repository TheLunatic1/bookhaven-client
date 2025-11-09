/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),          // <-- enable DaisyUI
  ],
  daisyui: {
    themes: ["light", "dark"],   // auto dark toggle support
    darkTheme: "dark",          // default dark
  },
};