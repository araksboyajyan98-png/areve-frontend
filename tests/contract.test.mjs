import test from "node:test";
import assert from "node:assert/strict";

import { errors } from "../src/shared/i18n/locales/errors.ts";
import { LeadFormSchema } from "../src/features/ContactForm/zod/schema.ts";
import { mockAdapter } from "../src/shared/mocks/adapter.ts";

/*
 * Договор с сервером. Репозитории разные, компилятор их не связывает, поэтому
 * ожидания записаны здесь явно и повторены в areve-backend.
 * Расхождение вылезло бы у родителя: сервер отвечает кодом, которого форма
 * не знает, и вместо понятной фразы человек видит заглушку.
 *
 * Источник истины — docs/project-plan.md, раздел 3 репозитория areve-backend.
 */

/** Коды, которыми сервер может ответить. */
const SERVER_ERROR_CODES = [
  "VALIDATION_FAILED",
  "NOT_FOUND",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL",
];

/** Поля, которые принимает POST /api/leads. */
const SERVER_FIELDS = ["name", "phone", "message", "website"];

/** Имя скрытого поля-ловушки; на сервере это HONEYPOT_FIELD. */
const HONEYPOT_FIELD = "website";

test("у каждого кода ошибки сервера есть перевод", () => {
  const translated = Object.keys(errors.hy);

  for (const code of SERVER_ERROR_CODES) {
    assert.ok(
      translated.includes(code),
      `сервер может ответить кодом ${code}, а перевода нет — ` +
        `добавьте ключ в src/shared/i18n/locales/errors.ts`
    );
  }
});

test("форма отправляет ровно те поля, что принимает сервер", () => {
  assert.deepEqual(Object.keys(LeadFormSchema.shape).sort(), [...SERVER_FIELDS].sort());
});

test("поле-ловушка есть в форме", () => {
  assert.ok(
    Object.keys(LeadFormSchema.shape).includes(HONEYPOT_FIELD),
    `сервер ждёт скрытое поле «${HONEYPOT_FIELD}» — без него боты перестанут отсеиваться`
  );
});

test("ограничения длины совпадают с серверными", () => {
  // Сервер: name 1–100, message до 2000.
  assert.equal(LeadFormSchema.safeParse({ name: "", phone: "095313633" }).success, false);

  assert.equal(
    LeadFormSchema.safeParse({ name: "a".repeat(101), phone: "095313633" }).success,
    false,
    "форма пропустила имя длиннее 100 — сервер его отвергнет"
  );

  assert.equal(
    LeadFormSchema.safeParse({
      name: "Լիլիթ",
      phone: "095313633",
      message: "a".repeat(2001),
    }).success,
    false,
    "форма пропустила сообщение длиннее 2000 — сервер его отвергнет"
  );

  assert.equal(
    LeadFormSchema.safeParse({ name: "Լիլիթ", phone: "095 313 633" }).success,
    true,
    "форма отвергла заявку, которую сервер принял бы"
  );
});

/*
 * Мок-режим — единственный способ проверить форму без сервера. Разошедшийся мок
 * хуже отсутствующего: на нём всё работает, а на боевом падает.
 */
const post = (data) => mockAdapter({ method: "post", url: "/leads", data: JSON.stringify(data) });

test("мок отвечает на успешную заявку как сервер", async () => {
  const response = await post({ name: "Լիլիթ", phone: "095 313 633" });

  assert.equal(response.status, 201);
  assert.deepEqual(Object.keys(response.data), ["id"], "наружу уходит только id");
});

test("мок отвечает на пустое тело как сервер", async () => {
  await assert.rejects(
    () => post({ name: "", phone: "" }),
    (error) => {
      assert.equal(error.response.status, 400);

      const payload = error.response.data.error;
      assert.equal(payload.code, "VALIDATION_FAILED");

      // Форма details: [{ field, message }] и без введённых значений
      assert.deepEqual(payload.details, [
        { field: "name", message: "name" },
        { field: "phone", message: "phone" },
      ]);
      return true;
    }
  );
});

test("мок отвечает на неизвестный путь как сервер", async () => {
  await assert.rejects(
    () => mockAdapter({ method: "get", url: "/nope" }),
    (error) => {
      assert.equal(error.response.status, 404);
      assert.equal(error.response.data.error.code, "NOT_FOUND");
      return true;
    }
  );
});
