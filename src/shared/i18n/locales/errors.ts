import { defineSection } from "./defineSection";

/*
 * Ключи VALIDATION_FAILED…INTERNAL совпадают с ErrorCode бэкенда
 * (shared/errors/AppError.ts в репозитории areve-backend). Новый код на
 * в той же правке.
 */
export const errors = defineSection({
  hy: {
    VALIDATION_FAILED: "Ստուգեք լրացված դաշտերը",
    NOT_FOUND: "Չի գտնվել",
    CONFLICT: "Հակասություն առկա տվյալների հետ",
    RATE_LIMITED: "Չափազանց շատ հարցումներ։ Փորձեք մի փոքր ուշ",
    INTERNAL: "Ինչ-որ բան այն չէ",
    submitFailed: "Չհաջողվեց ուղարկել հայտը",
  },
});
