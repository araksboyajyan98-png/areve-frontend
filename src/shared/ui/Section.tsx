import { cn } from "@/shared/lib";

interface SectionProps {
  id: string;
  /** Подложка чуть темнее фона — чередование секций, как в лендинге. */
  tint?: boolean;
  className?: string;
  children: React.ReactNode;
}

/*
 * scroll-mt-24 повторяет scroll-margin-top: 90px из обновлённого лендинга:
 * без него заголовок секции уезжает под липкую шапку при переходе по якорю.
 */
export const Section = ({ id, tint = false, className, children }: SectionProps) => (
  <section
    id={id}
    className={cn("scroll-mt-24 py-14 sm:py-20", tint && "bg-canvas-tint", className)}
  >
    {children}
  </section>
);
