/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#FAF8FF",
        "surface-bright": "#FAF8FF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F2F3FF",
        "surface-container": "#EAEDFF",
        "surface-container-high": "#E2E7FF",
        "surface-container-highest": "#DAE2FD",
        "on-surface": "#131B2E",
        "on-surface-variant": "#4A5568",
        "outline": "#6E7977",
        "outline-variant": "#CBD5E1",
        "primary": "#0F766E",           // Teal 700 / Esmeralda Amazônico
        "primary-hover": "#0D9488",     // Teal 600
        "primary-container": "#0F766E",
        "on-primary": "#FFFFFF",
        "secondary": "#25D366",         // Verde WhatsApp oficial
        "secondary-hover": "#20BA59",
        "tertiary": "#D97706",          // Âmbar alerta/planilha
        "tertiary-container": "#FEF3C7",
        "error": "#DC2626",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "sans-serif"],
      },
      borderRadius: {
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      boxShadow: {
        "soft": "0 2px 10px rgba(15, 23, 42, 0.04)",
        "card": "0 4px 14px rgba(15, 23, 42, 0.06)",
        "nav": "0 -4px 16px rgba(15, 23, 42, 0.05)",
      }
    },
  },
  plugins: [],
}
