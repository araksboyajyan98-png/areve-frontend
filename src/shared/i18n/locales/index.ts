import { LOCALES, type Locale } from "../model/locale";
import { common } from "./common";
import { errors } from "./errors";
import { validation } from "./validation";
import { nav } from "./nav";
import { hero } from "./hero";
import { about } from "./about";
import { values } from "./values";
import { adaptation } from "./adaptation";
import { routine } from "./routine";
import { terms } from "./terms";
import { testimonials } from "./testimonials";
import { nutrition } from "./nutrition";
import { contact } from "./contact";
import { footer } from "./footer";
import { popup } from "./popup";

/** Все разделы. Новый раздел достаточно дописать сюда. */
const SECTIONS = {
  common,
  errors,
  validation,
  nav,
  hero,
  about,
  values,
  adaptation,
  routine,
  terms,
  testimonials,
  nutrition,
  contact,
  footer,
  popup,
} as const;

type Sections = typeof SECTIONS;

/** Словарь одного языка. */
export type Dictionary = { [S in keyof Sections]: Sections[S][Locale] };

/** Хранится «раздел → язык», i18next ждёт «язык → раздел». */
export const resources = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    {
      translation: Object.fromEntries(
        Object.entries(SECTIONS).map(([name, section]) => [name, section[locale]])
      ),
    },
  ])
) as Record<Locale, { translation: Dictionary }>;

/** Коды ошибок, у которых есть перевод. */
export const TRANSLATED_ERROR_CODES: ReadonlySet<string> = new Set(Object.keys(errors[LOCALES[0]]));
