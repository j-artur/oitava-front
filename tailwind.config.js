/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1490px",
      },
    },
    extend: {
      colors: {
        bg: {
          white: "#ffffff",
          active: "#F9FAFB",
          hover: "#F4F6F8",
          input: "#F8F9FA",
        },
        border: {
          light: "#F1F3F5",
          dark: "#E9ECEF",
          darker: "#D0D5DD",
          checkbox: "#B4BFC5",
        },
        text: {
          accent: "#0f172a",
          primary: "#1e293b",
          secondary: "#334155",
          tertiary: "#475569",
          label: "#747C80",
          eye: "#B1B7BA",
        },
        primary: {
          light: "#66DBBF",
          normal: "#089b93",
          dark: "#0F8982",
          darker: "#0A7275",
        },
        destructive: {
          bg: "#FEE2E2",
          hover: "#FECACA",
          border: "#EF4444",
          text: "#EF4444",
        },
      },
    },
  },
  plugins: [
    /* require("tailwindcss-animate") */
  ],
};
export default config;
