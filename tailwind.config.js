const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: "#151515",
        primaryGray: "#1D1D1D",
        secondaryGray: "#272626",
        zGreen: "#10995B",
        zRed: "#FE6463",
        zBlue: "#202020",
        lavendar: "#666BC5",
      },
    },
  },
  plugins: [nextui()],
};
