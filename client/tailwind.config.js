/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f7882f",
        white: "#ffffe4",
      },
    },
  },
  plugins: [],
};
