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
        secondaryColor: "#9ec5ab",
        backgroundColor: "#f4f2ee",
        textColor: "#1F1F1F",
        textColorLight: "#474747",
      },
    },
  },
  plugins: [],
} satisfies Config;
