import axios from "axios";
import { translate, TRANSLATED_ERROR_CODES, VALIDATION_KEYS, type TranslationKey } from "@/shared/i18n";

type ErrorEnvelope = { error?: { code?: string; message?: string; details?: unknown } };

/** Разбор одного поля: имя поля формы и ключ перевода для подписи под ним. */
export interface FieldError {
  field: string;
  messageKey: TranslationKey;
}

/**
 * Разбор ответа 400 по полям.
 *
 * Схема zod и валидатор сервера написаны порознь и сойтись могут не во всём:
 * телефон, который здесь прошёл, там может не пройти. Без этого разбора
 * такой отказ превращался в одну общую строку над кнопкой — человек видел
 * «проверьте поля» и не знал, какое именно.
 */
export function getFieldErrors(error: unknown): FieldError[] {
  if (!axios.isAxiosError(error)) return [];

  const payload = (error.response?.data as ErrorEnvelope | undefined)?.error;
  if (payload?.code !== "VALIDATION_FAILED" || !Array.isArray(payload.details)) return [];

  const parsed: FieldError[] = [];

  for (const item of payload.details) {
    if (typeof item !== "object" || item === null) continue;

    const { field, message } = item as { field?: unknown; message?: unknown };
    if (typeof field !== "string" || typeof message !== "string") continue;

    // Незнакомый ключ пропускаем: лучше общая строка, чем «phone» под полем.
    if (!VALIDATION_KEYS.has(message)) continue;

    parsed.push({ field, messageKey: `validation.${message}` as TranslationKey });
  }

  return parsed;
}

/** `fallback` — ключ перевода: вызывающий не решает, на каком языке говорить. */
export function getErrorMessage(error: unknown, fallback: TranslationKey): string {
  const fallbackText = translate(fallback);
  if (!axios.isAxiosError(error)) return fallbackText;

  const payload = (error.response?.data as ErrorEnvelope | undefined)?.error;
  const code = payload?.code;

  if (code && TRANSLATED_ERROR_CODES.has(code)) {
    return translate(`errors.${code}` as TranslationKey);
  }

  // Незнакомый код: серверный текст лучше заглушки, но только на 4xx —
  // в 5xx может попасть содержимое исключения.
  const status = error.response?.status ?? 0;
  if (payload?.message && status >= 400 && status < 500) return payload.message;

  return fallbackText;
}
