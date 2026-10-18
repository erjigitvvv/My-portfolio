import uzMessages from "../../messages/uz.json";
import enMessages from "../../messages/en.json";
import type { Locale } from "./routing";

const dictionaries = {
  uz: uzMessages,
  en: enMessages,
};

export function getDictionary(locale: string) {
  const safeLocale: Locale = locale === "en" ? "en" : "uz";
  return dictionaries[safeLocale];
}

export function localizeField<T extends Record<string, any>>(
  item: T | null | undefined,
  fieldPrefix: string,
  locale: string
): string {
  if (!item) return "";
  const lang = locale === "en" ? "en" : "uz";
  const camelSuffix = locale === "en" ? "En" : "Uz";

  return (
    (item[`${fieldPrefix}_${lang}`] as string) ||
    (item[`${fieldPrefix}_uz`] as string) ||
    (item[`${fieldPrefix}${camelSuffix}`] as string) ||
    (item[`${fieldPrefix}Uz`] as string) ||
    ""
  );
}
