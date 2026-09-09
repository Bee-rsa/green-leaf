/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: "#A6B59A",
        wood1: "#C8A27A",
        sand: "#F2EFE4",
        wood: "#C8A27A"
      },
      fontFamily: {
        subheading: ["EB Garamond", "serif"],
        heading: ["Crimson Text", "serif"],
        body: ["Montserrat", "sans-serif"],
        text: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};