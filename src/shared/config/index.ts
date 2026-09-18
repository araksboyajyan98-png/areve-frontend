/*
 * Внешние адреса центра. Это данные, а не переводы, поэтому в словарях
 * их нет: читаемый вид телефона лежит в i18n, а ссылка — здесь.
 */

/**
 * Номер для WhatsApp.
 * В лендинге стоял `wa.me/37400000000` — заглушка. Здесь подставлен первый
 * из полученных телефонов центра. **Требует подтверждения:** если у центра
 * для WhatsApp другой номер, меняется эта строка.
 */
export const WHATSAPP_URL = "https://wa.me/37495313633";

/** Телефоны для ссылок `tel:`; как их видит человек — в `contact` словаря. */
export const PHONE_1_TEL = "+37495313633";
export const PHONE_2_TEL = "+37494505552";

export const FACEBOOK_URL = "https://facebook.com/areve.kids";
export const INSTAGRAM_URL = "https://instagram.com/areve.kids";
