const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "95v": "95vh",
        "100v": "100vh",
      },
      colors: {
        "dark-purple": "#251D3A",
        "light-purple": "#2A2550",
        "dark-orange": "#E04D01",
        "light-orange": "#FF7700",
      },
    },
    screens: {
      xs: "420px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
