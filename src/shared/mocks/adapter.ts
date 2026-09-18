import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";

// Типы из entities не импортируются: shared не зависит от слоёв выше.

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ok = <T>(config: AxiosRequestConfig, data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config: config as never,
});

// Ошибка в том же конверте, что у сервера.
const fail = (
  config: AxiosRequestConfig,
  status: number,
  code: string,
  message: string,
  details?: unknown
) =>
  Promise.reject(
    Object.assign(new Error(message), {
      isAxiosError: true,
      config,
      response: {
        status,
        data: { error: { code, message, ...(details !== undefined && { details }) } },
        headers: {},
        config,
      },
    })
  );

const uuid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());

type Handler = (config: AxiosRequestConfig) => Promise<AxiosResponse>;

const routes: Array<[method: string, pattern: string, handler: Handler]> = [
  [
    "post",
    "/leads",
    async (c) => {
      const body = typeof c.data === "string" ? JSON.parse(c.data) : (c.data ?? {});

      /*
       * Повторяет поведение сервера, чтобы форму можно было проверить целиком
       * без бэкенда: и успех, и отказ валидации.
       */
      const details: Array<{ field: string; message: string }> = [];
      if (!body.name?.trim()) details.push({ field: "name", message: "name" });
      if (!body.phone?.trim()) details.push({ field: "phone", message: "phone" });
      if (details.length > 0) {
        return fail(c, 400, "VALIDATION_FAILED", "Check the form fields", details);
      }

      // Ловушка: отвечаем как при успехе, заявку не создаём.
      if (typeof body.website === "string" && body.website.trim() !== "") {
        return ok(c, { id: uuid() }, 201);
      }

      return ok(c, { id: uuid() }, 201);
    },
  ],
  ["get", "/health", async (c) => ok(c, { status: "ok" })],
];

export const mockAdapter: AxiosAdapter = async (config) => {
  await delay(400);
  const url = (config.url ?? "").split("?")[0];
  const method = (config.method ?? "get").toLowerCase();

  for (const [m, pattern, handler] of routes) {
    if (m === method && pattern === url) return handler(config);
  }
  return fail(config, 404, "NOT_FOUND", `Mock route not found: ${method.toUpperCase()} ${url}`);
};
