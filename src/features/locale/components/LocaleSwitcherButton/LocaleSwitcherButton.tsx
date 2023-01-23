import React, { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import './LocaleSwitcherButton.css';
import { Locale } from '@features/locale/types';
import { Arrow } from '@components/Icons/Arrow';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  locale: Locale;
  opened?: boolean;
}

export const LocaleSwitcherButton = forwardRef(function LocaleSwitcherButton(
  { onClick, locale, opened }: Props,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      className={classNames('locale-switcher-button', { 'locale-switcher-button--opened': opened })}
      ref={ref}
      onClick={onClick}
    >
      <span className="locale-switcher-button__text">
        {locale === 'en' && 'ENG'}
        {locale === 'ru' && 'RU'}
      </span>
      <span className="locale-switcher-button__icon">
        <Arrow />
      </span>
    </button>
  );
});
