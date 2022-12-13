import React, { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { AdminPage } from '@features/admin/components/AdminPage/AdminPage';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';
import { AdminArticles } from '@features/admin/components/AdminArticles/AdminArticles';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
import { Page } from '@components/Page/Page';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';
import { PrivateRoute } from '@components/PrivateRoute/PrivateRoute';

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
