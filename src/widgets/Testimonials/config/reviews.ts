import type { TranslationKey } from "@/shared/i18n";

/** Отзывы. Хранят ключи перевода, а не текст — см. Values/config. */
export interface Review {
  text: TranslationKey;
  author: TranslationKey;
}

export const REVIEWS: readonly Review[] = [
  { text: "testimonials.firstText", author: "testimonials.firstAuthor" },
  { text: "testimonials.secondText", author: "testimonials.secondAuthor" },
  { text: "testimonials.thirdText", author: "testimonials.thirdAuthor" },
];
