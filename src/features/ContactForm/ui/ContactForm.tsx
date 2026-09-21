import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "@/entities/Lead";
import { useFieldError, useT } from "@/shared/i18n";
import { getErrorMessage, getFieldErrors } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { LeadFormSchema, type LeadFormValues } from "../zod/schema";
import { SuccessDialog } from "./SuccessDialog";

/** Поля, которым сервер вправе адресовать разбор. Ловушка сюда не входит. */
const VISIBLE_FIELDS = ["name", "phone", "message"] as const;
type VisibleField = (typeof VISIBLE_FIELDS)[number];

const isVisibleField = (field: string): field is VisibleField =>
  (VISIBLE_FIELDS as readonly string[]).includes(field);

export const ContactForm = () => {
  const t = useT();
  const fieldError = useFieldError();

  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  /*
   * Куда вернуть фокус после закрытия окна благодарности. Окно не может
   * определить это само: к моменту его появления кнопка «отправить» ещё
   * отключена, фокус с неё уже слетел на <body>, и возвращать было некуда —
   * следующий Tab начинал обход страницы заново.
   */
  const submitRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ resolver: zodResolver(LeadFormSchema) });

  const onSubmit = async (values: LeadFormValues) => {
    setServerError(null);
    try {
      await createLead(values);
      reset();
      setSent(true);
    } catch (error) {
      /*
       * Сначала разбор по полям. Схема здесь и валидатор на сервере написаны
       * порознь, и сервер может отвергнуть то, что форма пропустила: тогда
       * подпись должна встать под самим полем, а не общей строкой у кнопки.
       */
      const fieldErrors = getFieldErrors(error).filter((item) => isVisibleField(item.field));

      if (fieldErrors.length > 0) {
        for (const { field, messageKey } of fieldErrors) {
          setError(field as VisibleField, { type: "server", message: messageKey });
        }
        // Курсор — в первое неверное поле, иначе его пришлось бы искать глазами.
        setFocus(fieldErrors[0].field as VisibleField);
        return;
      }

      // Текст собирается по коду ошибки сервера, а не по его сообщению.
      setServerError(getErrorMessage(error, "errors.submitFailed"));
    }
  };

  return (
    <>
      {/*
        autoComplete="off" на всей форме, а не только на ловушке: браузер
        заполняет поля скопом, и поле с именем «website» — ровно то, куда
        он подставит сохранённый адрес сайта. Заполненная ловушка молча
        отправила бы настоящую заявку в корзину.
      */}
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <div>
          <label htmlFor="name">{t("contact.nameLabel")}</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            /*
              Связь поля с подписью об ошибке. Без неё скринридер читает поле
              как «Անուն, неверно» и не произносит, что именно не так:
              текст лежит отдельным абзацем, ничем с полем не связанным.
            */
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p className="field-error" id="name-error" role="alert">
              {fieldError(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone">{t("contact.phoneLabel")}</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("contact.phonePlaceholder")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="field-error" id="phone-error" role="alert">
              {fieldError(errors.phone.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="msg">{t("contact.messageLabel")}</label>
          <textarea
            id="msg"
            placeholder={t("contact.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "msg-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p className="field-error" id="msg-error" role="alert">
              {fieldError(errors.message.message)}
            </p>
          )}
        </div>

        {/*
          Ловушка для ботов. aria-hidden на обёртке, а не на самом поле:
          скрытое от скринридера поле, способное принять фокус, — известная
          ошибка разметки. Поле при этом убрано из обхода по Tab, так что
          человек до него не доберётся, а бот заполнит все поля подряд.
          Имя поля задано сервером — менять только вместе с ним.
        */}
        <div aria-hidden="true">
          <input type="text" className="honeypot" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {serverError && (
          <p role="alert" className="field-error">
            {serverError}
          </p>
        )}

        {/* disabled на время отправки — иначе двойное нажатие создаст две заявки. */}
        <Button ref={submitRef} type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("contact.submitting") : t("contact.submit")}
        </Button>
      </form>

      {sent && <SuccessDialog onClose={() => setSent(false)} returnFocusTo={submitRef} />}
    </>
  );
};
