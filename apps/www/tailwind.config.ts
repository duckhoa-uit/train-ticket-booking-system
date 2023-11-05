import type { Config } from 'tailwindcss';


const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "#F8F9FA",
      secondary: "#174576",
      accent: "#B57617",
    },
    textColor: {
      primaryTextColor: "#2C3640",
      secondaryTextColor: "#F8F9FA",
    },
  },
  plugins: [],
};
export default config