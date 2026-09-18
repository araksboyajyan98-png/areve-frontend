import { FACEBOOK_URL, INSTAGRAM_URL } from "@/shared/config";
import { useT } from "@/shared/i18n";
import { Container } from "@/shared/ui";
import { FacebookIcon, InstagramIcon } from "@/shared/ui/icons";

const LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#terms", key: "nav.terms" },
  { href: "#nutrition", key: "nav.nutrition" },
  { href: "#contact", key: "nav.contact" },
] as const;

const SOCIAL_LINK =
  "flex h-9 w-9 items-center justify-center rounded-full bg-canvas/15 text-canvas/90 " +
  "transition-colors hover:bg-canvas hover:text-accent-deep";

export const Footer = () => {
  const t = useT();

  return (
    <footer className="bg-ink text-canvas">
      <Container className="py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#hero" aria-label={t("nav.brandAria")}>
            <img src="/images/logo-footer.webp" alt="Արևէ" width={124} height={80} className="h-9 w-auto" />
          </a>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-canvas/80 hover:text-canvas">
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.facebookAria")}
              className={SOCIAL_LINK}
            >
              <FacebookIcon />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.instagramAria")}
              className={SOCIAL_LINK}
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-canvas/30 pt-6 text-sm text-canvas/70">
          {t("footer.copyright")}
        </div>
      </Container>
    </footer>
  );
};
