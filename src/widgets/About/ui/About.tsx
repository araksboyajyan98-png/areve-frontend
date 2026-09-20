import { useT } from "@/shared/i18n";
import { Carousel, Container, type CarouselSlide } from "@/shared/ui";
import { ABOUT_PHOTOS } from "../config/photos";

/*
 * Секцию <section id="about"> рисует страница: в оригинале внутри неё лежат
 * два блока — этот и «наши ценности». Обёртка здесь означала бы двойной
 * отступ между ними.
 */
export const About = () => {
  const t = useT();

  /*
   * Слайдов ровно столько, сколько фотографий в папке — вместе с точками.
   * Рисованных заглушек из лендинга больше нет: они занимали слайды,
   * за которыми не стоит ни одной настоящей фотографии.
   */
  const slides: CarouselSlide[] = ABOUT_PHOTOS.map((photo, i) => ({
    photo: true,
    content: (
      <img
        src={photo.src}
        alt={photo.altKey ? t(photo.altKey) : t("about.photoAlt", { n: i + 1 })}
        loading="lazy"
      />
    ),
  }));

  return (
    <Container className="about-grid">
      <div className="about-text">
        <h2>{t("about.title")}</h2>
        <p>{t("about.text1")}</p>
        <p>{t("about.text2")}</p>
      </div>

      {/* Пустая папка не должна ломать вёрстку — блока просто не будет. */}
      {slides.length > 0 && (
        <Carousel
          className="about-carousel"
          label={t("about.carouselLabel")}
          prevLabel={t("common.prevSlide")}
          nextLabel={t("common.nextSlide")}
          dotLabel={(i) => t("about.photoAlt", { n: i + 1 })}
          autoPlay
          slides={slides}
        />
      )}
    </Container>
  );
};
