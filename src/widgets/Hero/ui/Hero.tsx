import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export const Hero = () => {
  const t = useT();

  return (
    <section className="hero" id="hero">
      {/*
        Солнце — украшение, для скринридера его нет. Медленно вращается:
        оборот за 140 секунд, при prefers-reduced-motion не движется вовсе.
      */}
      <img
        className="hero-sun"
        src="/images/hero-sun.webp"
        alt=""
        aria-hidden="true"
        width={813}
        height={847}
      />

      <Container className="hero-grid">
        <div className="hero-inner">
          <h1>
            {t("hero.titleStart")} <span className="accent-word">{t("hero.titleAccent")}</span>
          </h1>

          <p>{t("hero.text")}</p>

          <span className="hero-tag">{t("hero.tag")}</span>

          <div className="hero-actions">
            {/* Запись — через WhatsApp: он открывает приложение и не зависит
                от того, настроена ли у родителя почта. */}
            <ButtonLink href={WHATSAPP_URL} external>
              {t("hero.ctaVisit")}
            </ButtonLink>
            <ButtonLink href="#routine" variant="ghost">
              {t("hero.ctaRoutine")}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/hero.webp" alt={t("hero.imageAlt")} width={1120} height={896} />
        </div>
      </Container>
    </section>
  );
};
