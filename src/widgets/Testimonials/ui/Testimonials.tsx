import { useT } from "@/shared/i18n";
import { Container, Section, SectionHead } from "@/shared/ui";
import { REVIEWS } from "../config/reviews";

export const Testimonials = () => {
  const t = useT();

  return (
    <Section id="testimonials" tint>
      <Container>
        <SectionHead title={t("testimonials.title")} />

        <div className="trio-wrap">
          <div className="testi-grid">
            {REVIEWS.map((review) => (
              <div className="testi-card" key={review.text}>
                <div className="testi-mark" aria-hidden="true">
                  «
                </div>
                <p>{t(review.text)}</p>
                <footer>{t(review.author)}</footer>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
