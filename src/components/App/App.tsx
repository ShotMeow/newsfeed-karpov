import React, { FC } from 'react';
import ArticleItem from '../ArticleItem/ArticleItem';
import Navigation from '../Navigation/Navigation';
import Articles from '../Articles/Articles';

import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

const App: FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/article/:id" element={<ArticleItem />} />
          <Route path="/:categoryId" element={<Articles />} />
          <Route path="/" element={<Articles />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__bottom">
            <p className="footer__text">
              Сделано на Frontend курсе в{' '}
              <a rel="noreferrer" className="footer__link" href="https://karpov.courses/frontend" target="_blank">
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

export default App;
