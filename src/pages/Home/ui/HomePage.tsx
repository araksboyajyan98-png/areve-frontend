import { useT } from "@/shared/i18n";
import { About } from "@/widgets/About";
import { Adaptation } from "@/widgets/Adaptation";
import { Contact } from "@/widgets/Contact";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Hero } from "@/widgets/Hero";
import { Nutrition } from "@/widgets/Nutrition";
import { Routine } from "@/widgets/Routine";
import { Terms } from "@/widgets/Terms";
import { Testimonials } from "@/widgets/Testimonials";
import { Values } from "@/widgets/Values";

/** Порядок секций повторяет лендинг. */
export const HomePage = () => {
  const t = useT();

  return (
  <>
    {/*
      Первая цель при обходе с клавиатуры: позволяет перескочить меню
      и попасть сразу в содержимое. Видна только когда получает фокус.
    */}
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-surface"
    >
      {t("common.skipToContent")}
    </a>

    <Header />

    <main id="main">
      <Hero />
      <About />
      <Values />
      <Adaptation />
      <Routine />
      <Terms />
      <Testimonials />
      <Nutrition />
      <Contact />
    </main>

    <Footer />
  </>
  );
};
