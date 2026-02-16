import { createContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './strings';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'barrera-healthy-eats-language';

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') {
      return stored;
    }
  } catch (error) {
    console.error('Failed to read language preference from localStorage:', error);
  }
  return 'en';
}

function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.error('Failed to save language preference to localStorage:', error);
  }
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  useEffect(() => {
    // Sync language on mount in case localStorage changed in another tab
    const stored = getStoredLanguage();
    if (stored !== language) {
      setLanguageState(stored);
    }
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
