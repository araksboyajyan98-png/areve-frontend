import type { TranslationKey } from "@/shared/i18n";

/**
 * Тарифы. Хранят ключи перевода, а не текст — см. Values/config.
 *
 * Выделенного тарифа нет: все три карточки одинаковые, отличает их время.
 */
export interface Plan {
  title: TranslationKey;
  hours: TranslationKey;
  items: readonly TranslationKey[];
}

export const PLANS: readonly Plan[] = [
  {
    title: "terms.shortTitle",
    hours: "terms.shortHours",
    items: ["terms.shortItem1", "terms.shortItem2", "terms.shortItem3"],
  },
  {
    title: "terms.mediumTitle",
    hours: "terms.mediumHours",
    items: ["terms.mediumItem1", "terms.mediumItem2", "terms.mediumItem3"],
  },
  {
    title: "terms.fullTitle",
    hours: "terms.fullHours",
    items: ["terms.fullItem1", "terms.fullItem2", "terms.fullItem3", "terms.fullItem4"],
  },
];
