import React, { FC } from 'react';
import classNames from 'classnames';
import './LocaleSwitcherMobile.css';
import { useLocale } from '@features/locale/hooks';
import { LocaleSwitcherButton } from '@features/locale/components/LocaleSwitcherButton/LocaleSwitcherButton';
import { LocaleSwitcherMenu } from '@features/locale/components/LocaleSwitcherMenu/LocaleSwitcherMenu';

interface Props {
  onClickLocaleButton: () => any;
  onChangeLocale: () => any;
  isMenuActive: boolean;
}

export const LocaleSwitcherMobile: FC<Props> = ({ onClickLocaleButton, isMenuActive, onChangeLocale }) => {
  const { locale, setLocale } = useLocale();

  return (
    <div className={classNames('locale-switcher-mobile', { 'locale-switcher-mobile--opened': isMenuActive })}>
      {isMenuActive ? (
        <LocaleSwitcherMenu
          selectedLocale={locale}
          onChangeLocale={(locale) => {
            setLocale(locale);
            onChangeLocale();
          }}
        />
      ) : (
        <LocaleSwitcherButton onClick={onClickLocaleButton} locale={locale} />
      )}
    </div>
  );
};
