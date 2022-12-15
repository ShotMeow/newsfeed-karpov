import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchNews, apiFetchTrends } from '@app/api';
import { setNews, setTrends } from './slice';

export const fetchNews = createAsyncThunk('api/fetchNews', (_, thunk) => {
  return apiFetchNews().then((news) => {
    thunk.dispatch(setNews(news.items));
  });
});

export const fetchTrends = createAsyncThunk('api/fetchTrends', (_, thunk) => {
  return apiFetchTrends().then((trends) => {
    thunk.dispatch(setTrends(trends.items));
  });
});
