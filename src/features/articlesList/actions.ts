import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchNews, apiFetchTrends } from '@app/api';
import { setNews, setTrends } from '@features/articlesList/slice';

export const fetchNews = createAsyncThunk('api/fetchNews', (lang: string, thunk) => {
  return apiFetchNews(lang).then((news) => {
    thunk.dispatch(setNews(news.items));
  });
});

export const fetchTrends = createAsyncThunk('api/fetchTrends', (lang: string, thunk) => {
  return apiFetchTrends(lang).then((trends) => {
    thunk.dispatch(setTrends(trends.items));
  });
});
