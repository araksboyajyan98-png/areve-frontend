import { useEffect, type RefObject } from "react";

/**
 * Держит в CSS-переменной `--header-height` настоящую высоту шапки.
 *
 * Шапка липкая, и её высота не постоянна: меню переносится на вторую строку,
 * на узком экране список сворачивается в кнопку, подпись под логотипом может
 * лечь в две строки. Любое вписанное руками число рано или поздно разойдётся
 * с действительностью — и заголовок раздела при переходе по якорю либо уедет
 * под шапку, либо повиснет слишком низко.
 *
 * ResizeObserver, а не замер при загрузке: высота меняется и после, когда
 * подгрузились шрифты или повернули телефон.
 */
export function useHeaderHeight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const apply = () => {
      document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, [ref]);
}
