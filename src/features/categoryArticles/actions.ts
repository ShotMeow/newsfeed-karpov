import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchCategory } from '@app/api';
import { setCategoryArticles } from '@features/categoryArticles/slice';

export const fetchCategoryArticles = createAsyncThunk(
  'api/fetchCategoryArticles',
  (params: { lang: string; id: number }, thunk) => {
    return apiFetchCategory(params.lang, params.id).then((news) => {
      thunk.dispatch(setCategoryArticles({ id: params.id, articles: news.items }));
    });
  }
);
