/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "Grayish_Blue" : "#6e7e92",
        "Light_Grayish_Blue" : "#c8d3de",
        "White" : "#ffffff",
        "Dark_Blue" : "#1d3245",
        "Dark_Grayish_Blue" : "#28393d",
        "Muted_Blue" : "#8399b0",
      },
      width: {
        "Wlogo": "95px",
      },
      height: {
        "Hlogo": "95px"
      },
      inset: {
        Rposition: '135px',
      },
      animation: {
        fadeInDown: "fadeInDown 0.5s ease-out forwards",
        fadeOut: "fadeOut 0.5s ease-in forwards",
      },
      keyframes: {
        fadeInDown: {
          "0%": { transform: "translateY(-50%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
}

