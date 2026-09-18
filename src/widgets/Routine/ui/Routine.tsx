import { useT } from "@/shared/i18n";
import { Card, Container, IconBadge, Section, SectionHead } from "@/shared/ui";
import { ROUTINE } from "../config/routine";

export const Routine = () => {
  const t = useT();

  return (
    <Section id="routine" tint>
      <Container>
        <SectionHead title={t("routine.title")} />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTINE.map(({ Icon, title, text }) => (
            /* Список нумерованный: это последовательность дня, а не набор карточек. */
            <li key={title}>
              <Card className="h-full">
                <IconBadge>
                  <Icon className="h-6 w-6" />
                </IconBadge>
                <h3 className="text-lg">{t(title)}</h3>
                <p className="mt-2 text-sm text-ink-soft">{t(text)}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
};
