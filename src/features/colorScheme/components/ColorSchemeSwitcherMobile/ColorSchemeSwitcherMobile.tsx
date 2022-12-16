import React, { FC } from 'react';
import './ColorSchemeSwitcherMobile.css';
import { useColorScheme } from '@features/colorScheme/hooks';
import { ColorSchemeSwitcherButton } from '@features/colorScheme/components/ColorSchemeSwitcherButton/ColorSchemeSwitcherButton';
import { ColorSchemeSwitcherMenu } from '@features/colorScheme/components/ColorSchemeSwitcherMenu/ColorSchemeSwitcherMenu';

interface Props {
  onClickSchemeButton: () => any;
  isMenuActive: boolean;
}

export const ColorSchemeSwitcherMobile: FC<Props> = ({ onClickSchemeButton, isMenuActive }) => {
  const { userScheme, setUserScheme } = useColorScheme();

  return (
    <div className="color-scheme-switcher-mobile">
      {isMenuActive ? (
        <ColorSchemeSwitcherMenu selectedScheme={userScheme} onChangeScheme={(scheme) => setUserScheme(scheme)} />
      ) : (
        <ColorSchemeSwitcherButton onClick={onClickSchemeButton} scheme={userScheme} />
      )}
    </div>
  );
};
