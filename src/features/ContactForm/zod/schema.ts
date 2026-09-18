import { z } from "zod";
import { isValidPhone } from "../lib/phone";

/*
 * Схема создаётся один раз при загрузке модуля, поэтому сообщения — это
 * КЛЮЧИ перевода, а не текст: текст застыл бы на языке того момента.
 * Ключ превращает в строку useFieldError на каждой отрисовке.
 *
 * Ограничения длины совпадают с валидатором бэкенда.
 */
export const LeadFormSchema = z.object({
  name: z.string().trim().min(1, "validation.name").max(100, "validation.tooLong"),
  phone: z.string().trim().refine(isValidPhone, "validation.phone"),
  message: z.string().trim().max(2000, "validation.message").optional(),
  /** Ловушка для ботов: человек её не видит и не заполняет. */
  website: z.string().optional(),
});

export type LeadFormValues = z.infer<typeof LeadFormSchema>;
