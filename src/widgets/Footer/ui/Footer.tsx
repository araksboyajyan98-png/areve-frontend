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

/** Порядок в строке: логотип, соцсети, карта сайта. */
export const Footer = () => {
  const t = useT();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-row">
          <a className="brand" href="#hero" aria-label={t("nav.brandAria")}>
            <img
              className="logo-wordmark logo-wordmark-footer"
              src="/images/logo-footer.webp"
              alt="Արևէ"
              width={187}
              height={120}
            />
          </a>

          <div className="footer-social-block">
            <span className="footer-social-label">{t("footer.followUs")}</span>

            <div className="footer-social">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.facebookAria")}
              >
                <FacebookIcon />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("footer.instagramAria")}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label={t("footer.sitemapAria")}>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {t(link.key)}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">{t("footer.copyright")}</div>
      </Container>
    </footer>
  );
};
