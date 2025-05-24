import { createContext, useContext, useEffect, useState } from "react";
import { localeStrings } from "../utils/localeStrings"; // Menggunakan named import

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState("id");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "id";
    setLocale(savedLocale);
    setIsLoading(false);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key) => {
    try {
      // Fallback chain: requested locale -> default locale ('id') -> original key
      return localeStrings[locale]?.[key] || localeStrings["id"]?.[key] || key;
    } catch (error) {
      console.error("Translation error:", error);
      return key;
    }
  };

  // Tambahan fitur untuk mengubah locale secara langsung
  const setLocaleManual = (newLocale) => {
    if (localeStrings.hasOwnProperty(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem("locale", newLocale);
    } else {
      console.warn(`Locale '${newLocale}' is not supported`);
    }
  };

  if (isLoading) {
    return null; // atau tampilkan loading spinner
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        toggleLocale,
        t,
        setLocale: setLocaleManual, // ekspos setLocaleManual
        supportedLocales: Object.keys(localeStrings), // daftar locale yang didukung
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
