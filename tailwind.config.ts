import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'min-h-600': { 'raw': '(min-height: 600px)' },
      'min-h-720': { 'raw': '(min-height: 720px)' },
      '2xsm': "420px",
      'xsm': "400px",
      sm: "640px",
      md: "768px",
      md2: "880px",
      lg: "1024px",
      l: "1120px",
      lx: "1160px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1660px",
      "4xl": "500px",
      "5xl": "1511px",
    },
    extend: {
      scale: {
        250: '2.5',
        300: '3',
      },
      colors: {
        primary: "#1A0044",
        secondary:"#FFB000",
        pink:"#FF007E"

      },

      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        monument: ['var(--font-monument)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
