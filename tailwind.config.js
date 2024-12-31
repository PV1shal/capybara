/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_text: "#FFFFFF",
        primary_bg: "#212121",
        secondary_bg: "#262626",
        primary_button: "#008080",
        primary_select: "#008080",
      },
    },
  },
  plugins: [],
};
