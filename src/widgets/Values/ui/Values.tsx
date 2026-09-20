import { useT } from "@/shared/i18n";
import { Container, SectionHead } from "@/shared/ui";
import { VALUES } from "../config/values";

/** Блок внутри секции «о нас» — так он устроен в оригинале. */
export const Values = () => {
  const t = useT();

  return (
    <Container id="values" className="values-block">
      <SectionHead title={t("values.title")} />

      <div className="values-grid">
        {VALUES.map(({ Icon, title, text }) => (
          <div className="value-card" key={title}>
            <Icon />
            <h3>{t(title)}</h3>
            <p>{t(text)}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};
