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
          bgsearch: "rgb(32,35,39)",
          bgtrend: "rgb(22,24,28)",
          gooogleText: "#3c4043",
        },
        tw_white: {
          primary: "#e7e9ea",
          secondar: "#d6d9db",
          hover: "rgba(255,255,255,0.03)",
        },
        tw_black: "#010001",
        tw_green: {
          text: "rgb(0,186,124)",
          bg_hover: "rgba(0,186,124,0.1)",
        },
        tw_red: {
          text: "rgb(249,24,128)",
          bg_hover: "rgba(249,24,128,0.1)",
        },
      },
      fontFamily: {
        chirp: "chirp",
        googleSans: "googleSans",
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
