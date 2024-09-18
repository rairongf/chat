"use client";

import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useState } from "react";
import { LocaleResource } from "./domain";
import { enUS_Resource, ptBR_Resource } from "./presenter";

type LanguageContextData = {
  locale: Intl.Locale;
  availableLocales: Intl.Locale[];
  resource: LocaleResource;
  changeLocale: (value: Intl.Locale) => Promise<void>;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
};

export const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData
);

export function LanguageProvider({ children }: BaseContextProps) {
  const resourcesByLocales: Map<Intl.Locale["baseName"], LocaleResource> =
    new Map([
      ["en-US", enUS_Resource],
      ["pt-BR", ptBR_Resource],
    ]);
  const availableLocales: Intl.Locale[] = [...resourcesByLocales.keys()].map(
    (key) => new Intl.Locale(key)
  );

  const [locale, setLocale] = useState<Intl.Locale>(availableLocales.at(0)!);
  const resource: LocaleResource = resourcesByLocales.get(locale.baseName)!;

  async function updateLocale(value: Intl.Locale) {
    if (value == locale) return;

    setLocale(value);
  }

  function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
    return date.toLocaleString(locale, options);
  }

  /* useEffect(() => {
    // Maybe fetch resources from a server
  }, [locale]); */

  return (
    <LanguageContext.Provider
      value={{
        locale,
        availableLocales,
        resource,
        changeLocale: updateLocale,
        formatDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
