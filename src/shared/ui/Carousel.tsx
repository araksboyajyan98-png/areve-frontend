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

/** Сколько пикселей нужно провести пальцем, чтобы это считалось листанием. */
const SWIPE_THRESHOLD = 50;

export interface CarouselSlide {
  content: React.ReactNode;
  /** Фотография занимает слайд целиком, рисунок — с отступами. */
  photo?: boolean;
}

interface CarouselProps {
  /** Чем это является для скринридера. */
  label: string;
  prevLabel: string;
  nextLabel: string;
  /** Точки под каруселью; функция даёт подпись каждой. */
  dotLabel?: (index: number) => string;
  /** Листать само. Выключается при prefers-reduced-motion. */
  autoPlay?: boolean;
  /** По умолчанию 4500 мс — как в оригинале. */
  autoPlayMs?: number;
  className?: string;
  slides: readonly CarouselSlide[];
}

/**
 * Карусель фотографий. Вид — классы .carousel-* из перенесённых стилей:
 * слайды лежат в ряд и сдвигаются трансформацией, без пересчёта разметки
 * на каждый кадр.
 */
export const Carousel = ({
  label,
  prevLabel,
  nextLabel,
  dotLabel,
  autoPlay = false,
  autoPlayMs = 4500,
  className,
  slides,
}: CarouselProps) => {
  const count = slides.length;
  const [index, setIndex] = useState(0);

  /*
   * Причины остановки считаются раздельно. С одним флагом они гасили друг
   * друга: человек ведёт по карусели с клавиатуры, мышь случайно проходит
   * над ней и уходит — mouseleave снимает паузу, и слайд уезжает из-под
   * того, кто его читает.
   */
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  // Переключается без перезагрузки страницы — карусель должна замереть сразу.
  const reducedMotion = useSyncExternalStore(subscribeToMotionSetting, readMotionSetting);

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (!autoPlay || paused || reducedMotion || count < 2) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => clearInterval(timer);
    /*
     * index в зависимостях намеренно: отсчёт начинается заново после каждого
     * перехода, в том числе по стрелке или точке. Так в оригинале — иначе
     * слайд, пролистанный вручную, мог бы смениться через долю секунды.
     */
  }, [autoPlay, paused, reducedMotion, count, autoPlayMs, index]);

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
      className={className}
      // Пауза, пока смотрят или ведут по ней с клавиатуры.
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn("carousel-slide", slide.photo && "photo")}
            /*
             * inert, а не aria-hidden: он и от скринридера прячет, и убирает
             * содержимое из обхода по Tab. С одним aria-hidden ссылка внутри
             * скрытого слайда получала бы фокус, оставаясь невидимой.
             */
            inert={i !== index}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => go(index - 1)}
            className="carousel-arrow prev"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => go(index + 1)}
            className="carousel-arrow next"
          >
            ›
          </button>
        </>
      )}

      {dotLabel && count > 1 && (
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={dotLabel(i)}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn("carousel-dot", i === index && "active")}
            />
          ))}
        </div>
      )}
    </div>
  );
};
