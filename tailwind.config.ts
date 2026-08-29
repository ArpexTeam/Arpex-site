// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // seguro ter, mesmo se não usar
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem", screens: { "2xl": "1320px" } },
    },
  },
  plugins: [],
} satisfies Config;
