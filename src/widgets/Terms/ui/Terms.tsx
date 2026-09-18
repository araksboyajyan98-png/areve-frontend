import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { cn } from "@/shared/lib";
import { ButtonLink, Container, Section, SectionHead } from "@/shared/ui";
import { PLANS } from "../config/plans";

export const Terms = () => {
  const t = useT();

  return (
    <Section id="terms">
      <Container>
        <SectionHead title={t("terms.title")} text={t("terms.subtitle")} />

        <div className="grid gap-5 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <div
              key={plan.title}
              className={cn(
                "flex flex-col rounded-card border p-7",
                plan.highlighted
                  ? "border-transparent bg-sage-deep text-canvas"
                  : "border-line bg-canvas-tint"
              )}
            >
              <h3 className="text-xl">{t(plan.title)}</h3>

              <div
                className={cn(
                  "mt-2 text-2xl font-semibold",
                  plan.highlighted ? "text-canvas" : "text-accent-deep"
                )}
              >
                {t(plan.hours)}
              </div>

              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className={plan.highlighted ? "text-canvas/90" : "text-ink-soft"}>
                    <span aria-hidden="true">✧ </span>
                    {t(item)}
                  </li>
                ))}
              </ul>

              {/* Цены не публикуются — обе кнопки ведут спросить. */}
              <ButtonLink
                href={WHATSAPP_URL}
                external
                variant={plan.highlighted ? "white" : "primary"}
                className="mt-7 self-start"
              >
                {t("terms.cta")}
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
