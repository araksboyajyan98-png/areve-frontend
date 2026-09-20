import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { ButtonLink, Container, Section, SectionHead } from "@/shared/ui";
import { PLANS } from "../config/plans";

export const Terms = () => {
  const t = useT();

  return (
    <Section id="terms">
      <Container>
        <SectionHead title={t("terms.title")} text={t("terms.subtitle")} />

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div className="plan-card" key={plan.title}>
              <h3>{t(plan.title)}</h3>
              <div className="hours">{t(plan.hours)}</div>

              <ul>
                {plan.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">✧</span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>

              {/* Цены не публикуются — все кнопки ведут спросить. */}
              <ButtonLink href={WHATSAPP_URL} external variant="white">
                {t("terms.cta")}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
