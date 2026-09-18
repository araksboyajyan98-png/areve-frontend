import { defineSection } from "./defineSection";

/*
 * Ключи name/phone/message совпадают с тем, что бэкенд кладёт
 * в details[].message при VALIDATION_FAILED.
 */
export const validation = defineSection({
  hy: {
    required: "Պարտադիր դաշտ",
    tooLong: "Չափազանց երկար",
    name: "Նշեք ձեր անունը",
    phone: "Նշեք վավեր հեռախոսահամար, օրինակ՝ +374 77 123 456",
    message: "Հաղորդագրությունը չափազանց երկար է",
  },
});
