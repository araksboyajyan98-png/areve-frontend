import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "../locales";
import { DEFAULT_LOCALE, detectLocale } from "./locale";

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLocale(),
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false }, // React экранирует сам
  returnNull: false,
});

/*
 * Смены языка нет: язык один (см. locale.ts). Когда появится второй,
 * сюда возвращается changeLocale — он меняет язык у i18next, сохраняет выбор
 * через storeLocale и переставляет <html lang>, от которого зависят переносы,
 * форматы дат и скринридер.
 */
document.documentElement.lang = i18n.language;

export { i18n };
