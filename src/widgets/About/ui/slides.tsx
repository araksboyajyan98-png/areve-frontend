/*
 * Рисованные слайды карусели — перенесены из оригинала как есть.
 * Это заглушки на месте будущих фотографий.
 *
 * Цвета берутся из переменных темы через currentColor и fill/stroke:
 * значения те же, что в оригинале.
 */

export const DrawingSlide = () => (
  <svg viewBox="0 0 160 220" fill="none" aria-hidden="true">
    <rect
      x="30"
      y="20"
      width="90"
      height="115"
      rx="6"
      fill="var(--cream-deep)"
      stroke="var(--orange-deep)"
      strokeWidth="3"
    />
    <path d="M45 60 L75 40 L105 95 L45 95 Z" fill="var(--sage)" opacity=".55" />
    <circle cx="90" cy="55" r="10" fill="var(--orange)" opacity=".8" />
    <line x1="20" y1="150" x2="130" y2="150" stroke="var(--ink-soft)" strokeWidth="4" strokeLinecap="round" />
    <line x1="65" y1="150" x2="65" y2="195" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
    <line x1="95" y1="150" x2="95" y2="195" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

export const StorySlide = () => (
  <svg viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <path
      d="M20 40 C45 28 65 28 80 40 L80 90 C65 78 45 78 20 90 Z"
      fill="var(--cream-deep)"
      stroke="var(--orange-deep)"
      strokeWidth="3"
    />
    <path
      d="M140 40 C115 28 95 28 80 40 L80 90 C95 78 115 78 140 90 Z"
      fill="var(--cream-deep)"
      stroke="var(--orange-deep)"
      strokeWidth="3"
    />
    <circle cx="110" cy="22" r="8" fill="var(--orange)" />
  </svg>
);
