import React, { useEffect } from 'react';
import { applyLocale, getSavedLocale } from '@features/locale/utils';
import { Locale } from '@features/locale/types';

export const useLocale = (): {
  locale: Locale;
  setLocale: React.Dispatch<Locale>;
} => {
  const [locale, setLocale] = React.useState(getSavedLocale());

  useEffect(() => {
    applyLocale(locale);
  }, [locale]);

  return { locale, setLocale };
};
