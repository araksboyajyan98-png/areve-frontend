import { useT } from "@/shared/i18n";
import { Container, Section, SectionHead } from "@/shared/ui";
import { GALLERY, MENU } from "../config/menu";

export const Nutrition = () => {
  const t = useT();

  return (
    <Section id="nutrition">
      <Container>
        {/* В этой секции подзаголовок во всю ширину, а не в 38 символов. */}
        <SectionHead title={t("nutrition.title")} text={t("nutrition.intro")} className="nutrition-head" />

        {/* Галерея — сетка из трёх фотографий, не карусель. */}
        <div className="nutrition-gallery">
          {GALLERY.map((photo) => (
            <figure key={photo.src}>
              <img
                src={photo.src}
                alt={t(photo.alt)}
                width={photo.width}
                height={photo.height}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <div className="nutrition-grid">
          <div className="menu-card">
            <h3>{t("nutrition.menuTitle")}</h3>

            {MENU.map((row) => (
              <div className="menu-row" key={row.meal}>
                <span className="meal">{t(row.meal)}</span>
                <span className="food">{t(row.food)}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
