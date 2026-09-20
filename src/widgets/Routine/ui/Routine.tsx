import { useT } from "@/shared/i18n";
import { Container, Section, SectionHead } from "@/shared/ui";
import { ROUTINE } from "../config/routine";

export const Routine = () => {
  const t = useT();

  return (
    <Section id="routine" tint>
      <Container>
        <SectionHead title={t("routine.title")} />

        <div className="routine-grid">
          {ROUTINE.map(({ Icon, title, text }) => (
            /*
             * Кружок под иконкой чередует цвет по чётности карточки —
             * это делает CSS через :nth-child, разметке знать не нужно.
             */
            <div className="routine-card" key={title}>
              <div className="icon-badge">
                <Icon />
              </div>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
