import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../articleItem/types';

interface InitialState {
  news: Article[];
  trends: Article[];
}

const initialState: InitialState = {
  news: [],
  trends: [],
};

export const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<Article[]>) => {
      state.news = action.payload;
    },
    setTrends: (state, action: PayloadAction<Article[]>) => {
      state.trends = action.payload;
    },
  },
});

export const { setNews, setTrends } = articlesListSlice.actions;

export default articlesListSlice.reducer;
