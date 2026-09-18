import axios from "axios";

/** Адрес API и режим моков. Подставляются Vite на сборке, а не в рантайме. */
export const apiConfig = {
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5001/api",
  useMocks: import.meta.env.VITE_USE_MOCKS === "true",
} as const;

export const api = axios.create({ baseURL: apiConfig.apiUrl });

/*
 * Мок-режим подменяет транспорт целиком: вызовы, интерцепторы и разбор ошибок
 * работают без изменений, в компонентах нет ни одного `if (useMocks)`.
 * Сравнение с литералом, а не через apiConfig: Vite подставляет значение на
 * сборке и вырезает ветку вместе с динамическим импортом из продакшен-бандла.
 */
if (import.meta.env.VITE_USE_MOCKS === "true") {
  const { mockAdapter } = await import("@/shared/mocks/adapter");
  api.defaults.adapter = mockAdapter;
  console.info("Mock mode: requests do not reach the server");
}
