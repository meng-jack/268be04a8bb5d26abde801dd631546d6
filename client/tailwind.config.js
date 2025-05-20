/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { // for brand colors
        "primary-color": "#003d76",
        "on-primary-color": "var(--on-primary)",
        "ripple-color": "var(--ripple)",
        "primary-darker-color": "var(--primary-darker",
        "secondary-color": "var(--secondary)",
        "secondary-darker-color": "var(--secondary-darker)",
        "tertiary-color": "var(--tertiary)",
        "on-tertiary-color": "var(--on-tertiary)",
        "surface-color": "var(--surface)",
      }
    },
  },
  plugins: [],
}

