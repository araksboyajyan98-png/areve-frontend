import { useT } from "@/shared/i18n";
import { Carousel, Container, type CarouselSlide } from "@/shared/ui";
import { DrawingSlide, StorySlide } from "./slides";

/*
 * Секцию <section id="about"> рисует страница: в оригинале внутри неё лежат
 * два блока — этот и «наши ценности». Обёртка здесь означала бы двойной
 * отступ между ними.
 */
export const About = () => {
  const t = useT();

  // Порядок слайдов как в оригинале: рисунок, фото, рисунок, фото.
  const slides: CarouselSlide[] = [
    { content: <DrawingSlide /> },
    {
      photo: true,
      content: (
        <img
          src="/images/about-blocks.webp"
          alt={t("about.slideBlocks")}
          width={1000}
          height={666}
          loading="lazy"
        />
      ),
    },
    { content: <StorySlide /> },
    {
      photo: true,
      content: (
        <img
          src="/images/about-roleplay.webp"
          alt={t("about.slideRolePlay")}
          width={1000}
          height={666}
          loading="lazy"
        />
      ),
    },
  ];

  return (
    <Container className="about-grid">
      <div className="about-text">
        <h2>{t("about.title")}</h2>
        <p>{t("about.text1")}</p>
        <p>{t("about.text2")}</p>
      </div>

      <Carousel
        className="about-carousel"
        label={t("about.carouselLabel")}
        prevLabel={t("common.prevSlide")}
        nextLabel={t("common.nextSlide")}
        dotLabel={(i) => `${t("about.carouselLabel")} ${i + 1}`}
        autoPlay
        slides={slides}
      />
    </Container>
  );
};
