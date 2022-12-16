import React, { FC } from 'react';
import classNames from 'classnames';
import './ColorSchemeSwitcherMenu.css';
import { Auto } from '@components/Icons/Auto';
import { Moon } from '@components/Icons/Moon';
import { Sun } from '@components/Icons/Sun';
import { ColorSchemeSwitcherValues } from '@features/colorScheme/types';

interface Props {
  selectedScheme: ColorSchemeSwitcherValues;
  onChangeScheme: (value: ColorSchemeSwitcherValues) => any;
  className?: string;
}

export const ColorSchemeSwitcherMenu: FC<Props> = ({ selectedScheme, onChangeScheme, className }) => {
  return (
    <div className={classNames('color-scheme-switcher-menu', className)}>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('auto')}>
        <Auto />
        <span className="color-scheme-switcher-menu__text">Авто</span>
        {selectedScheme === 'auto' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('light')}>
        <Sun />
        <span className="color-scheme-switcher-menu__text">Светлая</span>
        {selectedScheme === 'light' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
      <button className="color-scheme-switcher-menu__option" onClick={() => onChangeScheme('dark')}>
        <Moon />
        <span className="color-scheme-switcher-menu__text">Темная</span>
        {selectedScheme === 'dark' && (
          <img
            className="color-scheme-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt="Выбранная тема"
          />
        )}
      </button>
    </div>
  );
};
