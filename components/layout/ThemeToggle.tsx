"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "system" | "light" | "dark";

/** Must match the key read by the inline script in app/layout.tsx. */
const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";
const order: Theme[] = ["system", "light", "dark"];
const labels: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};
const icons = { system: Monitor, light: Sun, dark: Moon };

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/** "system" means no override: the attribute is removed and CSS follows the OS setting. */
function reflect(theme: Theme) {
  if (theme === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
}

function setTheme(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts for this page view only.
  }
  reflect(theme);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  // A change made in another tab arrives as a storage event.
  const onStorage = () => {
    reflect(readTheme());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Cycles the colour theme: system (the default), light, dark. The choice is
 * remembered in localStorage and applied before first paint by the inline
 * script in the document head, so there is no flash on reload.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "system");
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = icons[theme];

  return (
    <button
      type="button"
      className="theme-toggle inline-flex size-10 items-center justify-center border border-line text-ink hover:border-cobalt hover:text-cobalt"
      aria-label={`${labels[theme]}. Switch to ${labels[next].toLowerCase()}.`}
      title={labels[theme]}
      onClick={() => setTheme(next)}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
