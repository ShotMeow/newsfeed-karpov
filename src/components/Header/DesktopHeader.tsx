import React, { FC } from 'react';
import { Navigation } from '@components/Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';
import { ColorSchemeSwitcherDesktop } from '@features/colorScheme/components/ColorSchemeSwitcherDesktop/ColorSchemeSwitcherDesktop';

export const DesktopHeader: FC = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <Navigation className="header__navigation" />
        <div className="header__controls" style={{ transform: 'translateX(0)' }}>
          <ColorSchemeSwitcherDesktop />
        </div>
      </div>
    </header>
  );
};
