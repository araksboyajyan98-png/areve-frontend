/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  /*
   * Тем оформления здесь нет намеренно: весь вид задан в src/app/styles/App.css
   * переносом стилей оригинала. Завести цвета и здесь — получить два источника
   * правды, которые со временем разойдутся.
   *
   * Tailwind остаётся ради нормализации (preflight) и редких служебных утилит.
   */
  theme: {},
  plugins: [],
};
