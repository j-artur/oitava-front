/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          white: "#ffffff",
          active: "#F9FAFB",
          hover: "#F4F6F8",
        },
        border: {
          light: "#F1F3F5",
          dark: "#E9ECEF",
        },
        text: {
          light: "#495057",
          normal: "#3C465A",
          dark: "#212529",
        },
        primary: {
          light: "#66DBBF",
          normal: "#089b93",
          dark: "#0F8982",
          darker: "#0A7275",
        },
      },
    },
  },
  plugins: [],
};
export default config;
