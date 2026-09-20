import { cn } from "@/shared/lib";

interface SectionProps {
  id: string;
  /** Подложка чуть темнее фона — чередование секций, как в оригинале. */
  tint?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section = ({ id, tint = false, className, children }: SectionProps) => (
  <section id={id} className={cn("section", tint && "section-tint", className)}>
    {children}
  </section>
);
