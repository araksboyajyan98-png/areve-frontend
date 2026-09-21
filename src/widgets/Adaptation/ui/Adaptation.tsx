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
            {/*
              h2, а не h3: баннер — такой же раздел страницы, как соседние.
              С h3 обход по заголовкам выдавал его вложенным в предыдущий
              раздел, которому он не принадлежит.
            */}
            <h2>{t("adaptation.title")}</h2>
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
