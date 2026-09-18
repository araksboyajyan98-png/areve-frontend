import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "@/entities/Lead";
import { useFieldError, useT } from "@/shared/i18n";
import { getErrorMessage } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { LeadFormSchema, type LeadFormValues } from "../zod/schema";
import { SuccessDialog } from "./SuccessDialog";

const FIELD =
  "mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-ink " +
  "placeholder:text-ink-soft/70 focus:border-accent focus:outline-none " +
  "focus:ring-2 focus:ring-accent/30";

export const ContactForm = () => {
  const t = useT();
  const fieldError = useFieldError();

  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ resolver: zodResolver(LeadFormSchema) });

  const onSubmit = async (values: LeadFormValues) => {
    setServerError(null);
    try {
      await createLead(values);
      reset();
      setSent(true);
    } catch (error) {
      // Текст собирается по коду ошибки сервера, а не по его сообщению.
      setServerError(getErrorMessage(error, "errors.submitFailed"));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {t("contact.nameLabel")}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            className={FIELD}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-accent-deep">{fieldError(errors.name.message)}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            {t("contact.phoneLabel")}
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("contact.phonePlaceholder")}
            aria-invalid={Boolean(errors.phone)}
            className={FIELD}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-accent-deep">{fieldError(errors.phone.message)}</p>
          )}
        </div>

        <div>
          <label htmlFor="msg" className="text-sm font-medium">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="msg"
            rows={4}
            placeholder={t("contact.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            className={FIELD}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-accent-deep">{fieldError(errors.message.message)}</p>
          )}
        </div>

        {/*
          Ловушка для ботов. Скрыта от глаз и от скринридера, исключена из
          обхода по Tab: человек её не заполнит, а бот заполнит все поля.
          Имя поля задано сервером — менять только вместе с ним.
        */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />

        {serverError && (
          <p role="alert" className="text-sm font-medium text-accent-deep">
            {serverError}
          </p>
        )}

        {/* disabled на время отправки — иначе двойное нажатие создаст две заявки. */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("contact.submitting") : t("contact.submit")}
        </Button>
      </form>

      {sent && <SuccessDialog onClose={() => setSent(false)} />}
    </>
  );
};
