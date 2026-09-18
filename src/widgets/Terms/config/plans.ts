import type { TranslationKey } from "@/shared/i18n";

/** Тарифы. Хранят ключи перевода, а не текст — см. Values/config. */
export interface Plan {
  title: TranslationKey;
  hours: TranslationKey;
  items: readonly TranslationKey[];
  /** Второй тариф выделен заливкой, как в лендинге. */
  highlighted: boolean;
}

export const PLANS: readonly Plan[] = [
  {
    title: "terms.halfTitle",
    hours: "terms.halfHours",
    items: ["terms.halfItem1", "terms.halfItem2", "terms.halfItem3"],
    highlighted: false,
  },
  {
    title: "terms.fullTitle",
    hours: "terms.fullHours",
    items: ["terms.fullItem1", "terms.fullItem2", "terms.fullItem3"],
    highlighted: true,
  },
];
