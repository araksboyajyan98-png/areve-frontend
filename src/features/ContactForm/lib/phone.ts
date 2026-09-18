/*
 * Повторяет правило бэкенда (shared/lib/normalizePhone.ts в areve-backend):
 * армянский номер — 8 цифр после кода страны 374, код оператора не с нуля.
 *
 * Дублирование намеренное: фронтенд и бэкенд — отдельные проекты, общего
 * кода у них нет. Проверка здесь нужна, чтобы родитель увидел ошибку сразу,
 * а не после обращения к серверу. Последнее слово всё равно за сервером.
 *
 * Ожидаемые значения зафиксированы в tests/phone.test.mjs — тот же набор
 * лежит в areve-backend, чтобы реализации не разошлись незаметно.
 */

const NATIONAL_DIGITS = 8;
const COUNTRY_CODE = "374";

function toNational(digits: string): string | null {
  if (digits.startsWith(COUNTRY_CODE) && digits.length === COUNTRY_CODE.length + NATIONAL_DIGITS) {
    return digits.slice(COUNTRY_CODE.length);
  }
  if (digits.startsWith("0") && digits.length === 1 + NATIONAL_DIGITS) {
    return digits.slice(1);
  }
  if (digits.length === NATIONAL_DIGITS) {
    return digits;
  }
  return null;
}

export function isValidPhone(raw: string): boolean {
  const national = toNational(raw.replace(/\D/g, ""));
  // код оператора не начинается с нуля — иначе «095 313 63» прошёл бы как номер
  return national !== null && !national.startsWith("0");
}
