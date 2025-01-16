import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md}",
    "./components/**/*.{js,ts,jsx,tsx,md}",
    "./app/**/*.{js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
