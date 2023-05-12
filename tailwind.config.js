/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        tw_blue: {
          primary: "#1d9bf0",
          hover: "#1a8cd8",
        },
        tw_soft_blue: {
          hover: "rgba(29,155,240,0.1)",
        },
        tw_gray: {
          border: "#2f3336",
          hover: "rgba(239,243,244,0.1)",
          text: "#71767b",
          secondary: "rgb(83,100,113)",
          line: "rgb(62,65,68)",
        },
        tw_white: {
          primary: "#e7e9ea",
          secondar: "#d6d9db",
        },
        tw_black: "#010001",
      },
      fontFamily: {
        chirp: "chirp",
        chirpss: [
          "chirp",
          {
            fontFeatureSettings: '"ss01"',
          },
        ],
      },
    },
  },
  plugins: [],
};
