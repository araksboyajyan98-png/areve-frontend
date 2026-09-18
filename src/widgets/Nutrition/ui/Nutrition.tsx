import { useT } from "@/shared/i18n";
import { Card, Carousel, Container, Section, SectionHead } from "@/shared/ui";
import { GALLERY, MENU } from "../config/menu";

export const Nutrition = () => {
  const t = useT();

  return (
    <Section id="nutrition">
      <Container>
        <SectionHead title={t("nutrition.title")} text={t("nutrition.intro")} />

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Carousel
            label={t("nutrition.title")}
            prevLabel={t("common.prevSlide")}
            nextLabel={t("common.nextSlide")}
            dotLabel={(i) => `${t("nutrition.title")} ${i + 1}`}
            slideClassName="aspect-[4/3]"
          >
            {GALLERY.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={t(photo.alt)}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>

          <Card>
            <h3 className="text-lg">{t("nutrition.menuTitle")}</h3>

            <dl className="mt-4 divide-y divide-line">
              {MENU.map((row) => (
                /* Приём пищи и блюдо — пара «термин и описание», отсюда dl. */
                <div key={row.meal} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-3">
                  <dt className="font-medium">{t(row.meal)}</dt>
                  <dd className="text-right text-sm text-ink-soft">{t(row.food)}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
