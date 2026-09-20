import { useEffect, useRef } from "react";
import { useT } from "@/shared/i18n";
import { Button } from "@/shared/ui";

const FOCUSABLE = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Окно благодарности. Показывается **только после ответа 201** — в лендинге
 * оно появлялось всегда, даже когда письмо никуда не уходило.
 */
export const SuccessDialog = ({ onClose }: { onClose: () => void }) => {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /** Куда вернуть фокус: обычно это кнопка «отправить». */
  const returnFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    /*
     * Фон не должен прокручиваться под открытым окном: иначе на телефоне
     * страница уезжает под пальцем, а окно остаётся на месте.
     */
    const scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      /*
       * Удержание фокуса внутри окна. Без этого Tab уводит на страницу позади,
       * хотя aria-modal обещает обратное: человек с клавиатуры оказывается
       * в форме, которую окно закрывает собой.
       */
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items || items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = scrollLock;
      // Фокус возвращается туда, откуда пришёл, иначе он падает на <body>
      // и следующий Tab начинает обход страницы заново.
      returnFocusTo.current?.focus();
    };
  }, [onClose]);

  /*
   * Закрывает только щелчок, начатый и законченный на подложке. Иначе
   * выделение текста в карточке, отпущенное за её краем, закрыло бы окно.
   */
  const pressedOverlay = useRef(false);

  return (
    <div
      className="popup-overlay"
      onMouseDown={(e) => {
        pressedOverlay.current = e.target === e.currentTarget;
      }}
      onMouseUp={(e) => {
        if (pressedOverlay.current && e.target === e.currentTarget) onClose();
        pressedOverlay.current = false;
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        className="popup-card"
      >
        <h3 id="success-title">
          {t("popup.title")}
        </h3>

        <p>{t("popup.text")}</p>

        <Button ref={closeRef} type="button" onClick={onClose}>
          {t("popup.close")}
        </Button>
      </div>
    </div>
  );
};
