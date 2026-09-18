import { Component, type ReactNode } from "react";
import { translate } from "@/shared/i18n";

/*
 * Без этого исключение в любом виджете гасит всю страницу: React снимает
 * с экрана всё дерево, и родитель видит белый лист вместо контактов центра.
 *
 * Классовый компонент — не стиль проекта, а единственный способ: хука
 * для перехвата ошибок отрисовки в React нет.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Unhandled render error", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-ink-soft">{translate("errors.INTERNAL")}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface hover:bg-accent-deep"
        >
          {translate("common.reload")}
        </button>
      </div>
    );
  }
}
