import React, { useEffect } from 'react';
import {
  applyScheme,
  getSavedScheme,
  getSystemScheme,
  removeSavedScheme,
} from '@features/colorScheme/colorSchemeUtils';
import { ColorSchemeSwitcherValues } from '@features/colorScheme/types';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const useColorScheme = (): {
  userScheme: ColorSchemeSwitcherValues;
  setUserScheme: React.Dispatch<ColorSchemeSwitcherValues>;
} => {
  const [userScheme, setUserScheme] = React.useState<ColorSchemeSwitcherValues>(getSavedScheme() || 'auto');

  useEffect(() => {
    if (userScheme === 'auto') {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === 'auto') {
        applyScheme(getSystemScheme());
      }
    };
    matchMedia.addEventListener('change', systemColorSchemeListener);

    return () => {
      matchMedia.removeEventListener('change', systemColorSchemeListener);
    };
  }, [userScheme]);

  return { userScheme, setUserScheme };
};
