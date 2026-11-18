"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  applyTheme,
  getThemeStorage,
  readTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

const CHANGE_EVENT = "portfolio-theme-change";
const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerSnapshot = (): Theme => "light";
function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    applyTheme(readTheme(getThemeStorage()), document);
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    applyTheme(getSnapshot(), document);
  }, []);
  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={() => {
        applyTheme(
          getSnapshot() === "dark" ? "light" : "dark",
          document,
          getThemeStorage(),
        );
        window.dispatchEvent(new Event(CHANGE_EVENT));
      }}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-xs text-foreground-muted transition-colors duration-150 hover:bg-surface-elevated hover:text-foreground"
    >
      <Sun aria-hidden className="h-4 w-4 dark:hidden" />
      <Moon aria-hidden className="hidden h-4 w-4 dark:block" />
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
