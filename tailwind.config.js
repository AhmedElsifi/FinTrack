export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#0A0A0A",
          800: "#283300",
          700: "#171719",
          600: "#202022",
          500: "#2E2E2E",
          400: "#3D3D3D",
          300: "#454547",
          200: "#69696B",
          100: "#C6C6C6",
          50: "#FFFFFF",
        },

        lime: {
          500: "#CEF739",
          800: "#283300",
        },

        green: {
          500: "#42EB05",
        },

        red: {
          500: "#FF4141",
        },
      },
      keyframes: {
        pingpong: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(calc(-100% + 100vw))" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        pingpong: "pingpong 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
