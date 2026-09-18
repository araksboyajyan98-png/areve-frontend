import { useT } from "@/shared/i18n";
import { Card, Container, Section, SectionHead } from "@/shared/ui";
import { REVIEWS } from "../config/reviews";

/*
 * В лендинге на узком экране отзывы превращались в карусель. Здесь они просто
 * встают в столбец: их три и они короткие, а карусель прячет текст за
 * нажатием и ничего не выигрывает. Для фотографий карусель осталась —
 * там она к месту.
 */
export const Testimonials = () => {
  const t = useT();

  return (
    <Section id="testimonials" tint>
      <Container>
        <SectionHead title={t("testimonials.title")} />

        <div className="grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <Card key={review.text} className="flex h-full flex-col">
              <span aria-hidden="true" className="font-heading text-4xl leading-none text-accent/50">
                «
              </span>

              <blockquote className="mt-2 flex-1 text-ink-soft">{t(review.text)}</blockquote>

              <footer className="mt-4 text-sm font-medium">{t(review.author)}</footer>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
