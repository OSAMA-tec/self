/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          text: 'rgb(var(--color-text-primary) / <alpha-value>)'
        },
        secondary: {
          bg: 'rgb(var(--color-bg-secondary) / <alpha-value>)'
        },
        accent: {
          primary: 'rgb(var(--color-accent-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-accent-secondary) / <alpha-value>)'
        },
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        code: {
          bg: 'rgb(var(--color-code-bg) / <alpha-value>)'
        }
      },
    },
  },
  plugins: [],
}