import { defineSection } from "./defineSection";

/*
 * Адрес и телефоны — настоящие, получены 18.09.2026.
 * Почта и часы работы всё ещё из лендинга и не подтверждены
 * (docs/project-plan.md, раздел 6).
 *
 * Телефоны хранятся в том виде, в каком их читает человек. Ссылка tel:
 * собирается в виджете: там нужен формат +374XXXXXXXX, а в глазах родителя
 * номер выглядит как «095 313 633».
 */
export const contact = defineSection({
  hy: {
    title: "Կապ մեզ հետ",

    address: "Ք. Աբովյան Երիտասարդական 13",
    phone1: "095 313 633",
    phone2: "094 505 552",
    email: "info@areve-kids.am",
    hours: "Երկուշաբթի–Ուրբաթ, 08:00–18:00",
    mapTitle: "«Արևէ» կենտրոնի քարտեզը",
    openInMaps: "Բացել Google Maps-ում",

    nameLabel: "Անուն",
    namePlaceholder: "Ձեր անունը",
    phoneLabel: "Հեռախոսահամար",
    phonePlaceholder: "+374",
    messageLabel: "Հաղորդագրություն",
    messagePlaceholder: "Գրեք ձեր հարցը կամ նախընտրելի այցելության օրը",

    submit: "Ուղարկել",
    submitting: "Ուղարկվում է…",
    success: "Ուղարկվեց ✓",
    successText: "Շնորհակալություն։ Կկապվենք ձեզ հետ մոտակա օրերին։",
  },
});
