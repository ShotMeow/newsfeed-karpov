import React, { FC } from 'react';
import classNames from 'classnames';
import './ColorSchemeSwitcherMobile.css';
import { useColorScheme } from '@features/colorScheme/hooks';
import { ColorSchemeSwitcherButton } from '@features/colorScheme/components/ColorSchemeSwitcherButton/ColorSchemeSwitcherButton';
import { ColorSchemeSwitcherMenu } from '@features/colorScheme/components/ColorSchemeSwitcherMenu/ColorSchemeSwitcherMenu';

interface Props {
  onClickSchemeButton: () => any;
  onChangeScheme: () => any;
  isMenuActive: boolean;
}

export const ColorSchemeSwitcherMobile: FC<Props> = ({ onClickSchemeButton, isMenuActive, onChangeScheme }) => {
  const { userScheme, setUserScheme } = useColorScheme();

  return (
    <div
      className={classNames('color-scheme-switcher-mobile', { 'color-scheme-switcher-mobile--opened': isMenuActive })}
    >
      {isMenuActive ? (
        <ColorSchemeSwitcherMenu
          selectedScheme={userScheme}
          onChangeScheme={(scheme) => {
            setUserScheme(scheme);
            onChangeScheme();
          }}
        />
      ) : (
        <ColorSchemeSwitcherButton onClick={onClickSchemeButton} scheme={userScheme} />
      )}
    </div>
  );
};
