import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchRelatedArticles } from '@app/api';
import { setRelatedArticles } from './slice';

export const fetchRelatedArticles = createAsyncThunk('api/fetchRelatedArticles', (articleId: number, thunk) => {
  return apiFetchRelatedArticles(articleId).then((news) => {
    thunk.dispatch(setRelatedArticles({ id: articleId, articles: news.items }));
  });
});
