import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import { CSSTransition } from 'react-transition-group';
import { Burger } from '@components/Icons/Burger';
import { Cross } from '@components/Icons/Cross';
import { ColorSchemeSwitcherMobile } from '@features/colorScheme/components/ColorSchemeSwitcherMobile/ColorSchemeSwitcherMobile';
import { LocaleSwitcherMobile } from '@features/locale/components/LocaleSwitcherMobile/LocaleSwitcherMobile';
import { createFocusTrap } from 'focus-trap';

export const MobileHeader: FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement | null>(null);

  const [isOpenMenu, toggleMenu] = useState(false);
  const [isOpenSubMenu, toggleSubMenu] = useState(false);
  const [selectedSubMenu, selectSubMenu] = useState<'locale' | 'scheme' | null>(null);
  const documentKeydownListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      toggleMenu(false);
    }
  };
  const closeSubMenu = () => {
    toggleSubMenu(false);
    selectSubMenu(null);
  };

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLElement);

    if (isOpenMenu) {
      trap.activate();
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      trap.deactivate();
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
    <header className="header" ref={ref}>
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
              <button className="header__mobile-back-button" onClick={closeSubMenu}>
                {t('header_mobile_submenu_back')}
              </button>
            ) : (
              <Navigation className="navigation--mobile" />
            )}

            <div
              className={classNames('header__mobile-controls', { 'header__mobile-controls--hasMenu': isOpenSubMenu })}
            >
              {(!isOpenSubMenu || (isOpenSubMenu && selectedSubMenu === 'locale')) && (
                <LocaleSwitcherMobile
                  isMenuActive={isOpenSubMenu}
                  onClickLocaleButton={() => {
                    selectSubMenu('locale');
                    toggleSubMenu(true);
                  }}
                  onChangeLocale={closeSubMenu}
                />
              )}

              {(!isOpenSubMenu || (isOpenSubMenu && selectedSubMenu === 'scheme')) && (
                <ColorSchemeSwitcherMobile
                  isMenuActive={isOpenSubMenu}
                  onClickSchemeButton={() => {
                    selectSubMenu('scheme');
                    toggleSubMenu(true);
                  }}
                  onChangeScheme={closeSubMenu}
                />
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </header>
  );
};
