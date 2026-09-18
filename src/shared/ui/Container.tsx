import { cn } from "@/shared/lib";

/** Ширина и боковые поля страницы: 1120px и отступы как в лендинге. */
export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12", className)}>
    {children}
  </div>
);
