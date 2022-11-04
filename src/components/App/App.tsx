import React, { FC } from 'react';
import ArticleItem from '../ArticleItem/ArticleItem';
import Articles from '../Articles/Articles';

import { Route, Routes, useLocation } from 'react-router-dom';
import AdminPage from '../AdminPage/AdminPage';
import AdminArticles from '../AdminArticles/AdminArticles';
import AdminArticleItem from '../AdminArticleItem/AdminArticleItem';
import Page from '../Page/Page';

const App: FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminPage>
            <AdminArticles />
          </AdminPage>
        }
      />
      <Route
        path="/admin/create"
        element={
          <AdminPage>
            <AdminArticleItem />
          </AdminPage>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <AdminPage>
            <AdminArticleItem />
          </AdminPage>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticleItem />
          </Page>
        }
      />
      <Route
        path="/:categoryId"
        element={
          <Page>
            <Articles />
          </Page>
        }
      />
      <Route
        path="/"
        element={
          <Page>
            <Articles />
          </Page>
        }
      />
    </Routes>
  );
};

export default App;
