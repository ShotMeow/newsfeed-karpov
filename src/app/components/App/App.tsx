import React, { FC, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
import { Page } from '@components/Page/Page';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';

const Admin = React.lazy(() => import('@app/components/Admin'));

export const App: FC = () => {
  const { pathname } = useLocation();
  const prevPathName = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathName.current) {
      prevPathName.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <React.Suspense fallback={<div>loading</div>}>
            <Admin />
          </React.Suspense>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticlePage />
          </Page>
        }
      />
      <Route
        path="/:category"
        element={
          <Page>
            <CategoryPage />
          </Page>
        }
      />
      <Route
        path="/"
        element={
          <Page>
            <HomePage />
          </Page>
        }
      />
    </Routes>
  );
};
