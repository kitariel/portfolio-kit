export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "portfolio-theme";

export function getThemeStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readTheme(storage?: Pick<Storage, "getItem">): Theme {
  try {
    return storage?.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(
  theme: Theme,
  document: Document,
  storage?: Pick<Storage, "setItem">,
) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#111317" : "#f8fafc");
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* The current page still works when persistence is blocked. */
  }
}

/** Runs before page content paints, independently of React hydration. */
export const themeInitScript = `(()=>{let theme='light';try{if(window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})==='dark')theme='dark'}catch{}const root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#111317':'#f8fafc')})()`;
