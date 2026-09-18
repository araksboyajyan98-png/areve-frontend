import { cn } from "@/shared/lib";

type Variant = "primary" | "ghost" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold " +
  "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-accent-deep sm:px-6 sm:py-3";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-surface hover:bg-accent-deep",
  ghost: "border border-line text-ink hover:bg-canvas-tint",
  // на тёмной подложке: светлая кнопка
  white: "bg-surface text-accent-deep hover:bg-canvas",
};

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  /** Внешняя ссылка открывается в новой вкладке. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Кнопка-ссылка: якорь на секцию или внешний адрес. */
export const ButtonLink = ({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: ButtonLinkProps) => (
  <a
    href={href}
    // rel="noopener" обязателен: иначе открытая вкладка получает доступ к window.opener
    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    className={cn(base, variants[variant], className)}
  >
    {children}
  </a>
);

// ComponentProps<"button">, а не ButtonHTMLAttributes: в React 19 ref —
// обычный проп, и он должен попадать в тип.
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: Variant;
}

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => (
  <button
    {...props}
    className={cn(base, variants[variant], "disabled:cursor-not-allowed disabled:opacity-70", className)}
  />
);
