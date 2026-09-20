import type { TranslationKey } from "@/shared/i18n";

/** Тарифы. Хранят ключи перевода, а не текст — см. Values/config. */
export interface Plan {
  title: TranslationKey;
  hours: TranslationKey;
  items: readonly TranslationKey[];
  /** Выделенный заливкой — один из трёх, как в оригинале был один из двух. */
  highlighted: boolean;
}

export const PLANS: readonly Plan[] = [
  {
    title: "terms.shortTitle",
    hours: "terms.shortHours",
    items: ["terms.shortItem1", "terms.shortItem2", "terms.shortItem3", "terms.shortItem4"],
    highlighted: false,
  },
  {
    title: "terms.mediumTitle",
    hours: "terms.mediumHours",
    items: ["terms.mediumItem1", "terms.mediumItem2", "terms.mediumItem3", "terms.mediumItem4"],
    highlighted: true,
  },
  {
    title: "terms.fullTitle",
    hours: "terms.fullHours",
    items: ["terms.fullItem1", "terms.fullItem2", "terms.fullItem3", "terms.fullItem4"],
    highlighted: false,
  },
];
