import { useT } from "@/shared/i18n";
import { WHATSAPP_URL } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

/*
 * Фотография под зелёной заливкой — как в лендинге: градиент от плотного
 * слева к прозрачному справа, чтобы текст читался поверх снимка.
 */
export const Adaptation = () => {
  const t = useT();

  return (
    <section id="adaptation" className="scroll-mt-24">
      <div
        className="relative bg-sage-deep bg-cover bg-center text-canvas"
        style={{ backgroundImage: "url(/images/adaptation-bg.webp)" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-sage-deep via-sage-deep/70 to-sage-deep/20"
          aria-hidden="true"
        />

        <Container className="relative py-14 sm:py-20">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl">{t("adaptation.title")}</h3>

            <p className="mt-3 inline-block rounded-full bg-canvas/20 px-3 py-1 text-sm font-medium">
              {t("adaptation.tag")}
            </p>

            <p className="mt-4 text-canvas/90">{t("adaptation.text")}</p>

            <ButtonLink href={WHATSAPP_URL} external variant="white" className="mt-7">
              {t("adaptation.cta")}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
};
