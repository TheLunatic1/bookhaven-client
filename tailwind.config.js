/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B4513",
        secondary: "#D2691E",
        accent: "#F4A460",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#8B4513",
          secondary: "#D2691E",
          accent: "#F4A460",
          "base-100": "#FFF8F0",
          "base-200": "#FDF6F0",
          "base-300": "#FAF1E6",
          neutral: "#5D4037",
        },
        dark: {
          primary: "#D2691E",
          secondary: "#F4A460",
          accent: "#FFB74D",
          "base-100": "#2C1A0F",
          "base-200": "#3D2414",
          "base-300": "#4E2E19",
          neutral: "#8D6E63",
        },
      },
    ],
  },
};