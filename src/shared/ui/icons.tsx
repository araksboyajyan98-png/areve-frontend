/*
 * Иконки перенесены из лендинга как есть.
 * Все рисуются текущим цветом (`currentColor`). Размер задаёт CSS секции:
 * у ценностей 34px, в распорядке 24px, в контактах 20px.
 */

type IconProps = { className?: string };

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Svg = ({ className, children }: IconProps & { children: React.ReactNode }) => (
  <svg {...stroke} className={className} aria-hidden="true">
    {children}
  </svg>
);

// ── Ценности ──────────────────────────────────────────────────
export const HeartIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 4.5 6.5 4.5c2 0 3.5 1.2 4.5 2.6C12 5.7 13.5 4.5 15.5 4.5c4 0 6 4 4 8-2.5 4.15-7.5 8.5-9.5 8.5" />
  </Svg>
);

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l8 3.5v5c0 5-3.4 8.7-8 9.5-4.6-.8-8-4.5-8-9.5v-5L12 3z" />
  </Svg>
);

export const BlocksIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="10.5" width="8" height="8" rx="1.5" />
    <rect x="12" y="5.5" width="8" height="8" rx="1.5" />
  </Svg>
);

export const HouseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 21V10l8-6 8 6v11h-5v-6H9v6z" />
  </Svg>
);

// ── Распорядок дня ────────────────────────────────────────────
export const SunriseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 18h18" />
    <path d="M6 18a6 6 0 0 1 12 0" />
    <path d="M12 5v3M5.5 10.5l1.8 1.8M18.5 10.5l-1.8 1.8" />
  </Svg>
);

export const CupIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h11v9a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V4Z" />
    <path d="M16 7h1.5a2 2 0 0 1 0 4H16" />
  </Svg>
);

export const PaletteIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3a9 9 0 1 0 5.2 16.3c.5-.4.3-1.2-.3-1.4-.9-.3-1.4-1.2-1.1-2.1.2-.6.8-1 1.4-1H18a4 4 0 0 0 4-4c0-4.3-4.5-7.8-10-7.8Z" />
    <circle cx="8" cy="10.5" r="1" />
    <circle cx="12" cy="7.8" r="1" />
    <circle cx="15.5" cy="10.5" r="1" />
  </Svg>
);

export const TreeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 7.5 10h3l-4 6h4.5v5h2v-5H18l-4-6h3Z" />
  </Svg>
);

export const PlateIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

export const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 10v9h12v-9" />
    <path d="M10 19v-5h4v5" />
  </Svg>
);

// ── Контакты ──────────────────────────────────────────────────
export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 5h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 14l5 2v4a2 2 0 0 1-2 2C9.5 22 2 14.5 2 7a2 2 0 0 1 2-2z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

// ── Соцсети ───────────────────────────────────────────────────
export const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.27-.04-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21h3.08Z" />
  </svg>
);

export const InstagramIcon = ({ className }: IconProps) => (
  <svg {...stroke} className={className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
