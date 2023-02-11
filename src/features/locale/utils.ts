import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Locale } from '@features/locale/types';
import en from './translations/en.json';
import ru from './translations/ru.json';

const LS_LOCALE_KEY = 'newsfeed:locale';

export function applyLocale(locale: Locale): void {
  localStorage.setItem(LS_LOCALE_KEY, locale);

  i18n.changeLanguage(locale);

  document.documentElement.lang = locale;
}

export function getSavedLocale(): Locale {
  const lsLang = localStorage.getItem(LS_LOCALE_KEY) as Locale | null;

  if (lsLang) {
    return lsLang;
  }

  const navigatorLanguage = window.navigator.language.split('-')[0] as Locale;

  if (Object.values(Locale).includes(navigatorLanguage)) {
    return navigatorLanguage;
  }

  return Locale.en;
}

export function initI18n(callback: () => any): void {
  const currentLocale = getSavedLocale();

  i18n.use(initReactI18next).init(
    {
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
      },
      lng: currentLocale,
      fallbackLng: Locale.en,
      interpolation: {
        escapeValue: false,
        prefix: '{',
        suffix: '}',
      },
    },
    () => {
      applyLocale(currentLocale);
      callback();
    }
  );
}
