import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#32746d",
        primaryColorLight: "#3D8F87",
        primaryColorDark: "#2B645E",
        secondaryColor: "#FFABAB",
        secondaryColorDark: "#FF7070",
        secondaryColorDarker: "#FF7070",
        backgroundColor: "#f4f2ee",
        textColor: "#1F1F1F",
        textColorLight: "#474747",
        textColorLighter: "#8F8F8F",
      },
    },
  },
  plugins: [],
} satisfies Config;
