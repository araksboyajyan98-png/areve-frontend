import { useEffect, useState } from "react";
import { useT } from "@/shared/i18n";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui";

const LINKS = [
  { href: "#routine", key: "nav.routine" },
  { href: "#terms", key: "nav.terms" },
  { href: "#testimonials", key: "nav.testimonials" },
  { href: "#nutrition", key: "nav.nutrition" },
] as const;

export const Header = () => {
  const t = useT();
  const [open, setOpen] = useState(false);

  /*
   * В лендинге меню держалось на чекбоксе — с ним нельзя закрыть по Escape
   * и нельзя закрыть после перехода по ссылке. Здесь обычное состояние.
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
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <a href="#hero" aria-label={t("nav.brandAria")} className="shrink-0">
          <img src="/images/logo.webp" alt="Արևէ" width={124} height={80} className="h-9 w-auto sm:h-10" />
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? t("common.menuClose") : t("common.menuOpen")}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-canvas-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-deep lg:hidden"
        >
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
          <span className="h-0.5 w-5 bg-ink" />
        </button>

        <nav
          id="main-nav"
          className={cn(
            "absolute left-0 right-0 top-full flex-col gap-1 border-b border-line bg-canvas p-4",
            "lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:bg-transparent lg:p-0",
            open ? "flex" : "hidden"
          )}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded px-2 py-2 text-sm text-ink-soft hover:text-ink lg:px-0 lg:py-0"
            >
              {t(link.key)}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-surface hover:bg-accent-deep"
          >
            {t("nav.contact")}
          </a>
        </nav>
      </Container>
    </header>
  );
};
