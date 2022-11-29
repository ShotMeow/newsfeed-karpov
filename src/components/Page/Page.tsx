import React, { FC, PropsWithChildren } from 'react';
import './Page.css';
import { Navigation } from '../Navigation/Navigation';
import { Logo } from '../Logo/Logo';

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
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
