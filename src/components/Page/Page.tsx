import React, { FC, PropsWithChildren } from 'react';
import './Page.css';
import Navigation from '../Navigation/Navigation';

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__bottom">
            <p className="footer__text">
              Сделано на Frontend курсе в{' '}
              <a className="footer__link" href="https://karpov.courses/frontend" target="_blank" rel="noreferrer">
                Karpov.Courses
              </a>
            </p>
            <p className="footer__text footer__text--gray">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Page;
