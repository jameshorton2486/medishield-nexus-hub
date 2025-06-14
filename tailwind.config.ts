
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#1e40af",
          foreground: "#fff"
        },
        // soften secondary as subtle gray background
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#1e293b"
        },
        accent: {
          DEFAULT: "#1e40af",
          foreground: "#fff"
        }
      },
      boxShadow: {
        'soft': '0 1px 4px 0 rgba(30, 64, 175, 0.05)',
        'card': '0 2px 8px 0 rgba(16, 30, 54, 0.04)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
