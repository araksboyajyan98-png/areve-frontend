import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "@/entities/Lead";
import { useFieldError, useT } from "@/shared/i18n";
import { getErrorMessage } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { LeadFormSchema, type LeadFormValues } from "../zod/schema";
import { SuccessDialog } from "./SuccessDialog";

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
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="name">{t("contact.nameLabel")}</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("contact.namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name && <p className="field-error">{fieldError(errors.name.message)}</p>}
        </div>

        <div>
          <label htmlFor="phone">{t("contact.phoneLabel")}</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("contact.phonePlaceholder")}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone && <p className="field-error">{fieldError(errors.phone.message)}</p>}
        </div>

        <div>
          <label htmlFor="msg">{t("contact.messageLabel")}</label>
          <textarea
            id="msg"
            placeholder={t("contact.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          {errors.message && <p className="field-error">{fieldError(errors.message.message)}</p>}
        </div>

        {/*
          Ловушка для ботов. Убрана с глаз и исключена из обхода по Tab:
          человек её не заполнит, а бот заполнит все поля.
          Имя поля задано сервером — менять только вместе с ним.
        */}
        <input
          type="text"
          className="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          {...register("website")}
        />

        {serverError && (
          <p role="alert" className="field-error">
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
