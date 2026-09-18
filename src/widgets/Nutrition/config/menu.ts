import type { TranslationKey } from "@/shared/i18n";

/** Пример меню на день. Хранит ключи перевода — см. Values/config. */
export interface MenuRow {
  meal: TranslationKey;
  food: TranslationKey;
}

export const MENU: readonly MenuRow[] = [
  { meal: "nutrition.breakfastMeal", food: "nutrition.breakfastFood" },
  { meal: "nutrition.lunchMeal", food: "nutrition.lunchFood" },
  { meal: "nutrition.snackMeal", food: "nutrition.snackFood" },
  { meal: "nutrition.dinnerMeal", food: "nutrition.dinnerFood" },
];

export interface GalleryPhoto {
  src: string;
  alt: TranslationKey;
  /** Настоящие размеры файла: без них страница прыгает, пока фото грузится. */
  width: number;
  height: number;
}

export const GALLERY: readonly GalleryPhoto[] = [
  { src: "/images/nutrition-soup-chicken.webp", alt: "nutrition.galleryAlt1", width: 800, height: 533 },
  { src: "/images/nutrition-soup-meatballs.webp", alt: "nutrition.galleryAlt2", width: 800, height: 800 },
  { src: "/images/nutrition-eggs-salad.webp", alt: "nutrition.galleryAlt3", width: 800, height: 533 },
];
