import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export const Hero = () => {
  const t = useT();

  return (
    <section id="hero" className="relative scroll-mt-24 overflow-hidden py-12 sm:py-16">
      {/* Солнце — украшение, для скринридера его нет. */}
      <img
        src="/images/hero-sun.webp"
        alt=""
        aria-hidden="true"
        width={480}
        height={500}
        className="pointer-events-none absolute -right-16 -top-16 w-64 opacity-70 sm:w-80"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl sm:text-5xl">
            {t("hero.titleStart")} <span className="text-accent-deep">{t("hero.titleAccent")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-ink-soft">{t("hero.text")}</p>

          <span className="mt-6 inline-block rounded-full bg-canvas-tint px-4 py-2 text-sm font-medium">
            {t("hero.tag")}
          </span>

          <div className="mt-8 flex flex-wrap gap-3">
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

        <img
          src="/images/hero.webp"
          alt={t("hero.imageAlt")}
          width={1120}
          height={896}
          className="rounded-card object-cover"
        />
      </Container>
    </section>
  );
};
