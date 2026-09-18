import { useT } from "@/shared/i18n";
import { Carousel, Container, Section } from "@/shared/ui";
import { DrawingSlide, StorySlide } from "./slides";

const PHOTO = "h-full w-full object-cover";

export const About = () => {
  const t = useT();

  return (
    <Section id="about">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">{t("about.title")}</h2>
          <p className="mt-5 text-ink-soft">{t("about.text1")}</p>
          <p className="mt-4 text-ink-soft">{t("about.text2")}</p>
        </div>

        <Carousel
          label={t("about.carouselLabel")}
          prevLabel={t("common.prevSlide")}
          nextLabel={t("common.nextSlide")}
          dotLabel={(i) => `${t("about.carouselLabel")} ${i + 1}`}
          autoPlay
          slideClassName="aspect-[4/3]"
        >
          <DrawingSlide />
          <img
            src="/images/about-blocks.webp"
            alt={t("about.slideBlocks")}
            width={1000}
            height={666}
            loading="lazy"
            className={PHOTO}
          />
          <StorySlide />
          <img
            src="/images/about-roleplay.webp"
            alt={t("about.slideRolePlay")}
            width={1000}
            height={666}
            loading="lazy"
            className={PHOTO}
          />
        </Carousel>
      </Container>
    </Section>
  );
};
