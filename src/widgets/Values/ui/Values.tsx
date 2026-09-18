import { useT } from "@/shared/i18n";
import { Card, Container, Section, SectionHead } from "@/shared/ui";
import { VALUES } from "../config/values";

export const Values = () => {
  const t = useT();

  return (
    <Section id="values">
      <Container>
        <SectionHead title={t("values.title")} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ Icon, title, text }) => (
            <Card key={title}>
              <Icon className="h-7 w-7 text-accent-deep" />
              <h3 className="mt-4 text-lg">{t(title)}</h3>
              <p className="mt-2 text-sm text-ink-soft">{t(text)}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
