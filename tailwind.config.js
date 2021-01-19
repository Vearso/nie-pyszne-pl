module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        light: "rgba(108, 99, 255, 0.2)",
        DEFAULT: "#6c63ff"
      },
      secondary: {
        lighter: "#e3e3e3",
        light: "#b3b3b3",
        DEFAULT: "#acacac",
        dark: "#3f3d56",
        darker: "rgba(63, 61, 86, 0.6)"
      },
      alert: "#f44336",
      shadow: "rgba(0, 0, 0, 0.4)"
      white: "#fff"
    },
    fontFamily: {
      default: "Roboto",
      light: "Roboto-light"
    },
    screens: {
     'sm' : {'max': '760px'}
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
