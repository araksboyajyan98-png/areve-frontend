import type { TranslationKey } from "@/shared/i18n";

/*
 * Фотографии карусели «Մեր մասին».
 *
 * Список собирается из содержимого папки src/assets/about на сборке:
 * сколько там файлов — столько слайдов и точек. Чтобы добавить фотографию,
 * достаточно положить файл в папку; править код не нужно.
 *
 * Порядок — по имени файла, поэтому имена стоит начинать с номера:
 * 01-…, 02-…, тогда порядок показа очевиден и управляем.
 *
 * Почему здесь, а не в public: файлы в public копируются как есть, и
 * перечислить их на сборке нельзя. Отсюда же выигрыш — Vite добавит к именам
 * отпечаток содержимого, и браузер не покажет старую фотографию вместо новой.
 */
const files = import.meta.glob<string>("/src/assets/about/*.{webp,jpg,jpeg,png,avif}", {
  eager: true,
  import: "default",
});

/**
 * Подписи к фотографиям, которые уже были в лендинге.
 * Новый файл получит общую подпись с номером — интерфейс от этого не сломается,
 * но если фотография заслуживает своей подписи, добавьте строку сюда
 * и ключ в словарь `about`.
 */
const ALT_BY_FILE: Readonly<Record<string, TranslationKey>> = {
  "about-blocks.webp": "about.slideBlocks",
  "about-roleplay.webp": "about.slideRolePlay",
};

export interface AboutPhoto {
  src: string;
  /** Готовая подпись есть не у каждого файла. */
  altKey?: TranslationKey;
}

export const ABOUT_PHOTOS: readonly AboutPhoto[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    altKey: ALT_BY_FILE[path.split("/").pop() ?? ""],
  }));
