/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        eiraButton: "#8c7851",
        eiraButtonText: "#fffffe",
        eiraBackground: "#f9f4ef",
        eiraHeadline: "#020826",
        eiraParagraph: "#716040",
      },
    },
  },
  plugins: [],
};
