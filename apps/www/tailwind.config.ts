import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        train: "url('/img/bg-train.jpg')",
      },
    },
    colors: {
      primary: "#F8F9FA",
      secondary: "#174576",
      lightblue: "#1890ff",
      accent: "#B57617",
      white: "#FFF",
    },
    textColor: {
      primary: "#2C3640",
      secondary: "#F8F9FA",
      accent: "#B57617",
      black: "#000",
    },
    borderColor: {
      primary: "#2C3640",
      secondary: "#174576",
      accent: "#B57617",
      black: "#000",
    },
  },
  plugins: [],
};
export default config;
