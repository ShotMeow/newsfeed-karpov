import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import './LocaleSwitcherMenu.css';
import { Locale } from '@features/locale/types';

interface Props {
  selectedLocale: Locale;
  onChangeLocale: (value: Locale) => any;
  className?: string;
}

export const LocaleSwitcherMenu: FC<Props> = ({ selectedLocale, onChangeLocale, className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames('locale-switcher-menu', className)}>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale(Locale.en)}>
        <span className="locale-switcher-menu__text">English</span>
        {selectedLocale === Locale.en && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt={t('locale_selected') || ''}
          />
        )}
      </button>
      <button className="locale-switcher-menu__option" onClick={() => onChangeLocale(Locale.ru)}>
        <span className="locale-switcher-menu__text">Русский</span>
        {selectedLocale === Locale.ru && (
          <img
            className="locale-switcher-menu__check"
            src={require('../../../../images/check.svg')}
            alt={t('locale_selected') || ''}
          />
        )}
      </button>
    </div>
  );
};
