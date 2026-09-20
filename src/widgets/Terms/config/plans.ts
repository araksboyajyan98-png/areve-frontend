import type { TranslationKey } from "@/shared/i18n";

/** Тарифы. Хранят ключи перевода, а не текст — см. Values/config. */
export interface Plan {
  title: TranslationKey;
  hours: TranslationKey;
  items: readonly TranslationKey[];
  /** Выделен брендовым оранжевым — полный день. */
  highlighted: boolean;
}

export const PLANS: readonly Plan[] = [
  {
    title: "terms.shortTitle",
    hours: "terms.shortHours",
    items: ["terms.shortItem1", "terms.shortItem2", "terms.shortItem3"],
    highlighted: false,
  },
  {
    title: "terms.mediumTitle",
    hours: "terms.mediumHours",
    items: ["terms.mediumItem1", "terms.mediumItem2", "terms.mediumItem3"],
    highlighted: false,
  },
  {
    title: "terms.fullTitle",
    hours: "terms.fullHours",
    items: ["terms.fullItem1", "terms.fullItem2", "terms.fullItem3", "terms.fullItem4"],
    highlighted: true,
  },
];
