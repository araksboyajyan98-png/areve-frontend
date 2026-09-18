import { ContactForm } from "@/features/ContactForm";
import { MAP_EMBED_URL, MAP_LINK_URL, PHONE_1_TEL, PHONE_2_TEL } from "@/shared/config";
import { useT } from "@/shared/i18n";
import { Container, Section } from "@/shared/ui";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/shared/ui/icons";

export const Contact = () => {
  const t = useT();

  return (
    <Section id="contact" tint>
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">{t("contact.title")}</h2>

          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
              <span>{t("contact.address")}</span>
            </li>

            {/* Два номера: ссылка ведёт на +374…, а видит человек местный вид. */}
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
              <span className="flex flex-col gap-1">
                <a href={`tel:${PHONE_1_TEL}`} className="hover:text-accent-deep">
                  {t("contact.phone1")}
                </a>
                <a href={`tel:${PHONE_2_TEL}`} className="hover:text-accent-deep">
                  {t("contact.phone2")}
                </a>
              </span>
            </li>

            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
              <a href={`mailto:${t("contact.email")}`} className="hover:text-accent-deep">
                {t("contact.email")}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
              <span>{t("contact.hours")}</span>
            </li>
          </ul>

          {/*
            Карта грузится лениво: раздел контактов внизу страницы, и встройка
            Google тянет заметный объём. Пока родитель до неё не доскроллил,
            она не стоит ему ничего.
          */}
          <div className="mt-6 overflow-hidden rounded-card border border-line">
            <iframe
              src={MAP_EMBED_URL}
              title={t("contact.mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-56 w-full border-0"
            />
          </div>

          {/*
            Ссылка рядом с картой, а не вместо неё: на телефоне она открывает
            приложение Google Maps, где сразу строится маршрут. Встроенная
            карта этого не умеет.
          */}
          <a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent-deep hover:underline"
          >
            <PinIcon className="h-4 w-4" />
            {t("contact.openInMaps")}
          </a>
        </div>

        <ContactForm />
      </Container>
    </Section>
  );
};
