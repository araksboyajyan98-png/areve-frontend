import { cn } from "@/shared/lib";

/** Заголовок секции и необязательный подзаголовок под ним. */
export const SectionHead = ({
  title,
  text,
  className,
}: {
  title: string;
  text?: string;
  className?: string;
}) => (
  <div className={cn("section-head", className)}>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);
