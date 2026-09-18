/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      /*
       * Имена — по смыслу, значения — в App.css для каждой темы.
       * Новый цвет добавляется сюда и в обе темы сразу.
       */
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        "canvas-tint": "rgb(var(--color-canvas-tint) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-deep": "rgb(var(--color-accent-deep) / <alpha-value>)",
        sage: "rgb(var(--color-sage) / <alpha-value>)",
        "sage-deep": "rgb(var(--color-sage-deep) / <alpha-value>)",
      },
      fontFamily: {
        // заголовки лендинга — с засечками, текст — без
        heading: ['"Noto Serif Armenian"', "Georgia", "serif"],
        sans: ['"Noto Sans Armenian"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      maxWidth: {
        container: "1120px",
      },
    },
  },
  plugins: [],
};
