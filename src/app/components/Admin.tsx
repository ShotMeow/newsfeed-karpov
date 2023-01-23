import React, { FC } from 'react';
import { PrivateRoute } from '@features/auth/components/PrivateRoute/PrivateRoute';
import { AdminPage } from '@features/admin/components/AdminPage/AdminPage';
import { AdminArticles } from '@features/admin/components/AdminArticles/AdminArticles';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { Route, Routes } from 'react-router-dom';
import { Page } from '@components/Page/Page';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { initializeAPI } from '@app/api';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';

const firebaseApp = initializeAPI();

const Admin: FC = () => {
  return (
    <Routes>
      <AuthContextProvider firebaseApp={firebaseApp}>
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
          path="/sign-in"
          element={
            <Page>
              <LoginContainer />
            </Page>
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
      </AuthContextProvider>
    </Routes>
  );
};

export default Admin;
