import React, { FC, useEffect } from 'react';
import { Route, useLocation, Routes } from 'react-router-dom';

import { HomePage } from '../HomePage/HomePage';
import { CategoryPage } from '../CategoryPage/CategoryPage';
import { ArticlePage } from '../ArticlePage/ArticlePage';
import { Page } from '../Page/Page';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { LoginContainer } from '../../features/auth/login/LoginContainer';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <Page>
            <LoginContainer />
          </Page>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage>
              <AdminArticles />
            </AdminPage>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <PrivateRoute>
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <PrivateRoute>
            <AdminPage>
              <AdminArticleItem />
            </AdminPage>
          </PrivateRoute>
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
