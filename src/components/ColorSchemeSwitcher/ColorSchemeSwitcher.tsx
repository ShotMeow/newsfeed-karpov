import React, { FC, useEffect } from 'react';
import { applyScheme, getSavedScheme, getSystemScheme, removeSavedScheme } from '../../assets/utils/colorSchemeUtils';
import './ColorSchemeSwitcher.css';

type ColorSchemeSwitcherValues = 'auto' | 'dark' | 'light';

const matchMedia = window.matchMedia('(prefers-color-scheme:dark)');

export const ColorSchemeSwitcher: FC = () => {
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

  return (
    <select
      className="color-scheme-switcher"
      onChange={(e) => setUserScheme(e.target.value as ColorSchemeSwitcherValues)}
      value={userScheme}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="auto">Auto</option>
    </select>
  );
};
