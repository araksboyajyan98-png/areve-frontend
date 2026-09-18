// ── Настройка проекта ─────────────────────────────────────────
/**
 * Решено 18.09.2026: сайт только на армянском.
 * Второй язык добавляется сюда одной строкой — после чего `tsc` покажет
 * каждый раздел словаря без перевода.
 */
export const LOCALES = ["hy"] as const;
export type Locale = (typeof LOCALES)[number];

/** Источник истины для набора ключей в словарях. */
export const SOURCE_LOCALE = "hy" as const satisfies Locale;
export const DEFAULT_LOCALE: Locale = "hy";

/** Название языка на нём самом. */
export const LOCALE_NAMES: Record<Locale, string> = {
  hy: "Հայերեն",
};

const STORAGE_KEY = "locale";
// ──────────────────────────────────────────────────────────────

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);

export function readStoredLocale(): Locale | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLocale(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // язык проживёт до конца сеанса
  }
}

/** Выбор в браузере → язык браузера → по умолчанию. */
export function detectLocale(): Locale {
  const saved = readStoredLocale();
  if (saved) return saved;

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const base = tag?.split("-")[0]?.toLowerCase();
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
