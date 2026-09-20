import { cn } from "@/shared/lib";

/** Варианты из перенесённых стилей: .btn-primary, .btn-white, .btn-ghost, .btn-on-dark. */
type Variant = "primary" | "white" | "ghost" | "on-dark";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  white: "btn-white",
  ghost: "btn-ghost",
  "on-dark": "btn-on-dark",
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
    className={cn("btn", variantClass[variant], className)}
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
  <button {...props} className={cn("btn", variantClass[variant], className)} />
);
