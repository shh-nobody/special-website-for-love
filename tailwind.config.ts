import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: ".3" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn .5s ease-out both",
        floatUp: "floatUp 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
