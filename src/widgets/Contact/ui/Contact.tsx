import { ContactForm } from "@/features/ContactForm";
import { MAP_EMBED_URL, MAP_LINK_URL, PHONE_1_TEL, PHONE_2_TEL } from "@/shared/config";
import { useT } from "@/shared/i18n";
import { Container, Section } from "@/shared/ui";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/shared/ui/icons";

export const Contact = () => {
  const t = useT();

  return (
    <Section id="contact" tint>
      <Container className="contact-grid">
        <div>
          <h2>{t("contact.title")}</h2>

          <ul className="info-list">
            <li>
              <PinIcon />
              <span>{t("contact.address")}</span>
            </li>

            {/* Два номера: ссылка ведёт на +374…, а видит человек местный вид. */}
            <li>
              <PhoneIcon />
              <span>
                <a href={`tel:${PHONE_1_TEL}`}>{t("contact.phone1")}</a>
                {", "}
                <a href={`tel:${PHONE_2_TEL}`}>{t("contact.phone2")}</a>
              </span>
            </li>

            <li>
              <MailIcon />
              <a href={`mailto:${t("contact.email")}`}>{t("contact.email")}</a>
            </li>

            <li>
              <ClockIcon />
              <span>{t("contact.hours")}</span>
            </li>
          </ul>

          {/*
            Карта грузится лениво: раздел внизу страницы, и встройка Google
            тянет заметный объём. Пока родитель до неё не доскроллил,
            она не стоит ему ничего.
          */}
          <div className="map-box">
            <iframe
              src={MAP_EMBED_URL}
              title={t("contact.mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/*
            Ссылка рядом с картой, а не вместо неё: на телефоне она открывает
            приложение Google Maps, где сразу строится маршрут.
          */}
          <a className="map-link" href={MAP_LINK_URL} target="_blank" rel="noopener noreferrer">
            <PinIcon />
            {t("contact.openInMaps")}
          </a>
        </div>

        <ContactForm />
      </Container>
    </Section>
  );
};
