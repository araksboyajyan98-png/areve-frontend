import { cn } from "@/shared/lib";

/** Ширина и боковые поля страницы — класс .container из перенесённых стилей. */
export const Container = ({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div id={id} className={cn("container", className)}>
    {children}
  </div>
);
