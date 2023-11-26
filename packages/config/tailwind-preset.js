const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const subtleColor = "#E5E7EB";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emphasis: "var(--ttbs-bg-emphasis)",
        default: "var(--ttbs-bg, white)",
        subtle: "var(--ttbs-bg-subtle)",
        muted: "var(--ttbs-bg-muted)",
        inverted: "var(--ttbs-bg-inverted)",
        info: "var(--ttbs-bg-info)",
        success: "var(--ttbs-bg-success)",
        attention: "var(--ttbs-bg-attention)",
        error: "var(--ttbs-bg-error)",
        darkerror: "var(--ttbs-bg-dark-error)",
        black: "#111111",
        brand: {
          default: "var(--ttbs-brand,#111827)",
          emphasis: "var(--ttbs-brand-emphasis,#101010)",
          subtle: "var(--ttbs-brand-subtle,#9CA3AF)",
          accent: "var(--ttbs-brand-accent,white)",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        darkgray: {
          50: "#101010",
          100: "#1c1c1c",
          200: "#2b2b2b",
          300: "#444444",
          400: "#575757",
          500: "#767676",
          600: "#a5a5a5",
          700: "#d6d6d6",
          800: "#e8e8e8",
          900: "#f3f4f6",
        },
      },
      borderColor: {
        emphasis: "var(--ttbs-border-emphasis, #9CA3AF)",
        default: "var(--ttbs-border, #D1D5DB)",
        subtle: `var(--ttbs-border-subtle, ${subtleColor})`,
        muted: "var(--ttbs-border-muted, #F3F4F6)",
        booker: `var(--ttbs-border-booker, ${subtleColor})`,
        error: "var(--ttbs-border-error, #AA2E26)",
        attention: "var(--ttbs-border-attention, #73321B)",
      },
      textColor: {
        emphasis: "var(--ttbs-text-emphasis, #111827)",
        default: "var(--ttbs-text, #374151)",
        subtle: "var(--ttbs-text-subtle, #6B7280)",
        muted: "var(--ttbs-text-muted, #9CA3AF)",
        inverted: "var(--ttbs-text-inverted, white)",
        info: "var(--ttbs-text-info, #253985)",
        success: "var(--ttbs-text-success, #285231)",
        attention: "var(--ttbs-text-attention, #73321B)",
        error: "var(--ttbs-text-error, #752522)",
        brand: "var(--ttbs-brand-text,'white')",
      },
      fill: {
        emphasis: "var(--ttbs-text-emphasis, #111827)",
        default: "var(--ttbs-text, #374151)",
        subtle: "var(--ttbs-text-subtle, #6B7280)",
        muted: "var(--ttbs-text-muted, #9CA3AF)",
        inverted: "var(--ttbs-text-inverted, white)",
        info: "var(--ttbs-text-info, #253985)",
        success: "var(--ttbs-text-success, #285231)",
        attention: "var(--ttbs-text-attention, #73321B)",
        error: "var(--ttbs-text-error, #752522)",
        brand: "var(--ttbs-brand-text)",
      },
      screens: {
        pwa: { raw: "(display-mode: standalone)" },
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "none" },
        },
        spinning: {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 600ms var(--animation-delay, 0ms) cubic-bezier(.21,1.02,.73,1) forwards",
        spinning: "spinning 0.75s linear infinite",
      },
      boxShadow: {
        dropdown: "0px 2px 6px -1px rgba(0, 0, 0, 0.08)",
      },
      borderWidth: {
        "booker-width": "var(--ttbs-border-booker-width, 1px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["Roboto Mono", "monospace"],
      },
      maxHeight: (theme) => ({
        0: "0",
        97: "25rem",
        ...theme("spacing"),
        full: "100%",
        screen: "100vh",
      }),
      minHeight: (theme) => ({
        0: "0",
        ...theme("spacing"),
        full: "100%",
        screen: "100vh",
      }),
      minWidth: (theme) => ({
        0: "0",
        ...theme("spacing"),
        full: "100%",
        screen: "100vw",
      }),
      maxWidth: (theme, { breakpoints }) => ({
        0: "0",
        ...theme("spacing"),
        ...breakpoints(theme("screens")),
        full: "100%",
        screen: "100vw",
      }),
      backgroundImage: {
        "gradient-primary": "radial-gradient(162.05% 170% at 109.58% 35%, #667593 0%, #E3E3E3 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-radix")(),
    require("@savvywombat/tailwindcss-grid-areas"),
    plugin(({ addVariant }) => {
      addVariant("mac", ".mac &");
      addVariant("windows", ".windows &");
      addVariant("ios", ".ios &");
    }),
    plugin(({ addBase, theme }) => {
      addBase({
        hr: {
          borderColor: theme("subtle"),
        },
      });
    }),
  ],
  variants: {
    scrollbar: ["dark"],
  },
};
