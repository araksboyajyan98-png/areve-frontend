import { useEffect, useRef, useState } from "react";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui";
import { useHeaderHeight } from "../model/useHeaderHeight";

const LINKS = [
  { href: "#routine", key: "nav.routine" },
  { href: "#terms", key: "nav.terms" },
  { href: "#testimonials", key: "nav.testimonials" },
  { href: "#nutrition", key: "nav.nutrition" },
] as const;

/*
 * Шапка в столбец: меню сверху, под ним логотип с подписью — всё по центру.
 * Порядок в разметке совпадает с порядком на экране, чтобы обход
 * с клавиатуры шёл так же, как читает глаз.
 */
export const Header = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useHeaderHeight(headerRef);

  /*
   * В оригинале меню держалось на чекбоксе — с ним нельзя закрыть по Escape
   * и нельзя закрыть после перехода по ссылке. Здесь обычное состояние,
   * вид тот же: класс .open раскрывает список по max-height.
   */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" ref={headerRef}>
      <Container className="nav-row">
        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? t("common.menuClose") : t("common.menuOpen")}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={cn("nav-links", open && "open")}>
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {t(link.key)}
            </a>
          ))}

          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            <strong>{t("nav.contact")}</strong>
          </a>
        </nav>

        {/*
          Отдельный элемент, а не рамка у меню или логотипа: у логотипа она
          потребовала бы растянуть ссылку во всю ширину, и нажатием стала бы
          пустота по бокам от него.
        */}
        <span className="nav-divider" aria-hidden="true" />

        <a className="brand" href="#hero" aria-label={t("nav.brandAria")}>
          <img className="logo-wordmark" src="/images/logo.webp" alt="Արևէ" width={124} height={80} />
          <span className="brand-tagline">{t("nav.tagline")}</span>
        </a>
      </Container>
    </header>
  );
};
