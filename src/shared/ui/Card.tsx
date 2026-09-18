import { cn } from "@/shared/lib";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("rounded-card border border-line bg-surface p-6", className)}>{children}</div>
);

/** Кружок под иконку в карточках распорядка дня. */
export const IconBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-canvas-tint text-accent-deep">
    {children}
  </div>
);
