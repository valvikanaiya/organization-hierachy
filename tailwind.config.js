/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%, 100%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slide: "slide 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
