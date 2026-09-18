import { create } from "zustand";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const readStored = (): Theme => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "light" || value === "dark") return value;
  } catch {
    // приватный режим или запрет хранилища
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/*
 * Переключателя темы в интерфейсе пока нет: тёмный вариант тёплой кремовой
 * палитры не выбран, и в App.css обе темы намеренно совпадают.
 * Механизм на месте — когда палитра появится, останется добавить ThemeToggle.
 */
export const useThemeStore = create<ThemeState>((set) => ({
  theme: readStored(),
  setTheme: (theme) => {
    set({ theme }); // к документу применяет только ThemeProvider
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // недоступное хранилище не ломает переключение
    }
  },
}));
