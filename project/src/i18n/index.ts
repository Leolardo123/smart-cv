import translations from "./translations";

const STORAGE_KEY = "locale_v1";
const DEFAULT_LOCALE: keyof typeof translations = "pt_br";

function readLocale(): keyof typeof translations {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw && (raw in translations)) return raw as keyof typeof translations;
  } catch (e) {}
  return DEFAULT_LOCALE;
}

export function t(key: string): string {
  const locale = readLocale();
  // @ts-ignore
  return translations[locale][key] || key;
}

export function getLocale(): string {
  return readLocale();
}

export function setLocale(l: keyof typeof translations) {
  try {
    localStorage.setItem(STORAGE_KEY, l as string);
  } catch (e) {}
  try {
    window.dispatchEvent(new Event("localeChange"));
  } catch (e) {}
}

export function availableLocales(): string[] {
  return Object.keys(translations);
}

export default { t, getLocale, setLocale, availableLocales };
