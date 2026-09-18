import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { i18n } from "./instance";
import type { Dictionary } from "../locales";

/** Ключ вида "common.loading" — выводится из словаря. */
export type TranslationKey = {
  [S in keyof Dictionary]: `${S & string}.${keyof Dictionary[S] & string}`;
}[keyof Dictionary];

type Values = Record<string, string | number>;

/** Перевод вне компонента: язык на момент вызова. */
export const translate = (key: TranslationKey, values?: Values) =>
  i18n.t(key, values ?? {}) as string;

/** Перевод в компоненте. */
export function useT() {
  const { t } = useTranslation();
  return useCallback((key: TranslationKey, values?: Values) => t(key, values ?? {}) as string, [t]);
}

/** Ошибка поля формы: ключ "validation.*" → текст; прочие строки как есть. */
export function useFieldError() {
  const t = useT();
  return useCallback(
    (message?: string) => {
      if (!message) return undefined;
      return message.startsWith("validation.") ? t(message as TranslationKey) : message;
    },
    [t]
  );
}
