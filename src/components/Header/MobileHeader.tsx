import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import { CSSTransition } from 'react-transition-group';
import { Burger } from '@components/Icons/Burger';
import { Cross } from '@components/Icons/Cross';
import { ColorSchemeSwitcherMobile } from '@features/colorScheme/components/ColorSchemeSwitcherMobile/ColorSchemeSwitcherMobile';

export const MobileHeader: FC = () => {
  const [isOpenMenu, toggleMenu] = useState(false);
  const [isOpenSubMenu, toggleSubMenu] = useState(false);
  const documentKeydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [isOpenMenu]);

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener('keydown', documentKeydownListener);
    } else {
      document.removeEventListener('keydown', documentKeydownListener);
    }

    return () => {
      document.removeEventListener('keydown', documentKeydownListener);
    };
  }, [isOpenMenu]);

  return (
    <header className="header">
      <div className="container header__mobile-container">
        <Logo />
        <button className="header__mobile-button" onClick={() => toggleMenu(!isOpenMenu)}>
          {isOpenMenu ? <Cross /> : <Burger />}
        </button>
      </div>
      <CSSTransition in={isOpenMenu} mountOnEnter unmountOnExit timeout={300} classNames="header-mobile-menu-animation">
        <div className="header__mobile-overlay">
          <div className="header__mobile-backdrop" />
          <div className="header__mobile-menu">
            {isOpenSubMenu ? (
              <button className="header__mobile-back-button" onClick={() => toggleSubMenu(false)}>
                К меню
              </button>
            ) : (
              <Navigation className="header__mobile-navigation" />
            )}

            <div
              className={classNames('header__mobile-controls', { 'header__mobile-controls--hasMenu': isOpenSubMenu })}
            >
              <ColorSchemeSwitcherMobile isMenuActive={isOpenSubMenu} onClickSchemeButton={() => toggleSubMenu(true)} />
            </div>
          </div>
        </div>
      </CSSTransition>
    </header>
  );
};
