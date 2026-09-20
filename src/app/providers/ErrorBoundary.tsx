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
      <div className="error-screen">
        <p>{translate("errors.INTERNAL")}</p>
        <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
          {translate("common.reload")}
        </button>
      </div>
    );
  }
}
