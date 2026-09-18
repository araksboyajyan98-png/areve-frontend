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

/*
 * Карта.
 *
 * Встройка по адресу, без ключа API. Официальный Google Maps Embed API просит
 * ключ и привязку к биллингу — ради одной точки на лендинге это лишняя возня,
 * а ключ всё равно лежал бы открыто в коде страницы.
 *
 * Проверено: Google отвечает на этот адрес перенаправлением на свою же
 * официальную встройку (maps/embed?pb=…) и отдаёт 200. То есть форма
 * поддерживается, ценой одного лишнего перехода при загрузке.
 *
 * Метка ставится по строке адреса, то есть примерно — на дом, а не на вход.
 * Чтобы она встала точно, нужен официальный код встройки: на Google Maps
 * найти центр → «Поделиться» → «Встроить карту» → скопировать адрес из
 * атрибута src (он начинается с https://www.google.com/maps/embed?pb=)
 * и подставить его в MAP_EMBED_URL вместо строки ниже. Ключ ему тоже не нужен.
 */
const MAP_QUERY = "Երիտասարդական 13, Աբովյան, Armenia";

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY
)}&output=embed&hl=hy`;

/** Открыть в приложении Google Maps: оттуда сразу строится маршрут. */
export const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAP_QUERY
)}`;
