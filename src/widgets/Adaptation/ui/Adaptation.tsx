import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

/*
 * Баннер во всю ширину: фотография под зелёной заливкой. Секция без
 * вертикальных отступов — их задаёт сам баннер, так в оригинале.
 */
export const Adaptation = () => {
  const t = useT();

  return (
    <section className="section" id="adaptation" style={{ paddingBlock: 0 }}>
      <div className="adapt">
        <Container>
          <div className="adapt-body">
            <h3>{t("adaptation.title")}</h3>
            <p className="adapt-tag">{t("adaptation.tag")}</p>
            <p>{t("adaptation.text")}</p>

            <ButtonLink href={WHATSAPP_URL} external variant="on-dark">
              {t("adaptation.cta")}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
};
