import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/shared/lib";

/*
 * Подписка на системную настройку «меньше движения».
 * useSyncExternalStore, а не useState с эффектом: настройка живёт вне React,
 * и читать её в эффекте значит вызвать лишнюю перерисовку сразу после первой.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToMotionSetting = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const readMotionSetting = () => window.matchMedia(REDUCED_MOTION).matches;

interface CarouselProps {
  /** Чем это является для скринридера: «фотографии», «отзывы». */
  label: string;
  prevLabel: string;
  nextLabel: string;
  /** Точки под каруселью; функция даёт подпись каждой. */
  dotLabel?: (index: number) => string;
  /** Листать само. Выключается при prefers-reduced-motion. */
  autoPlay?: boolean;
  autoPlayMs?: number;
  className?: string;
  slideClassName?: string;
  children: React.ReactNode[];
}

const ARROW =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full " +
  "border border-line bg-surface/90 text-lg leading-none text-ink " +
  "hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent-deep";

/** Сколько пикселей нужно провести пальцем, чтобы это считалось листанием. */
const SWIPE_THRESHOLD = 50;

/**
 * Одна карусель на два места: фотографии центра и галерея питания.
 * Слайды лежат в ряд и сдвигаются трансформацией — двигается композитный слой,
 * без пересчёта разметки на каждый кадр.
 */
export const Carousel = ({
  label,
  prevLabel,
  nextLabel,
  dotLabel,
  autoPlay = false,
  autoPlayMs = 5000,
  className,
  slideClassName,
  children,
}: CarouselProps) => {
  const count = children.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Переключается без перезагрузки страницы — карусель должна замереть сразу.
  const reducedMotion = useSyncExternalStore(subscribeToMotionSetting, readMotionSetting);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (!autoPlay || paused || reducedMotion || count < 2) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlay, paused, reducedMotion, count, autoPlayMs]);

  // Листание пальцем: на телефоне его пробуют раньше, чем ищут стрелки.
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const travelled = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
    go(travelled < 0 ? index + 1 : index - 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
      // Пауза, пока смотрят или ведут по ней с клавиатуры.
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="overflow-hidden rounded-card">
        <div
          className="flex motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {children.map((slide, i) => (
            <div
              key={i}
              className={cn("w-full shrink-0", slideClassName)}
              /*
               * inert, а не только aria-hidden: он и от скринридера прячет,
               * и убирает содержимое из обхода по Tab. С одним aria-hidden
               * ссылка внутри скрытого слайда получала бы фокус, оставаясь
               * невидимой — человек с клавиатуры оказывался бы неизвестно где.
               */
              inert={i !== index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => go(index - 1)}
            className={cn(ARROW, "left-2")}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => go(index + 1)}
            className={cn(ARROW, "right-2")}
          >
            ›
          </button>
        </>
      )}

      {dotLabel && count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={dotLabel(i)}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep",
                i === index ? "bg-accent-deep" : "bg-line hover:bg-ink-soft"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
