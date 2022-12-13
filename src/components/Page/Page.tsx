import React, { FC, PropsWithChildren, useState } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';
import { ColorSchemeSwitcher } from '@features/colorScheme/components/ColorSchemeSwitcher/ColorSchemeSwitcher';
import { EmailModal } from '@features/subscribeNotification/components/EmailModal/EmailModal';

const LS_EMAIL_SHOWN_KEY = 'newsfeed:email_modal_shown';

export const Page: FC<PropsWithChildren> = ({ children }) => {
  const [emailModalShown, setEmailModalShown] = useState(!localStorage.getItem(LS_EMAIL_SHOWN_KEY));

  return (
    <div className="wrapper">
      {emailModalShown && (
        <EmailModal
          onClose={() => {
            localStorage.setItem(LS_EMAIL_SHOWN_KEY, 'true');
            setEmailModalShown(false);
          }}
        />
      )}

      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
          <div className="header__controls">
            <ColorSchemeSwitcher />
          </div>
        </div>
      </header>

      <div>
        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <div className="footer__top">
              <Logo />
              <Navigation className="footer__navigation" />
            </div>
            <div className="footer__bottom">
              Сделано на Frontend курсе в{' '}
              <a className="footer__link" href="https://karpov.courses/frontend" target="_blank" rel="noreferrer">
                Karpov.Courses
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
