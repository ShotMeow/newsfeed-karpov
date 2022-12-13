import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../articleItem/types';

type InitialState = Record<number, Article[]>;

const initialState: InitialState = {};

export const relatedArticlesSlice = createSlice({
  name: 'relatedArticles',
  initialState,
  reducers: {
    setRelatedArticles: (state, action: PayloadAction<{ id: number; articles: Article[] }>) => {
      state[action.payload.id] = action.payload.articles;
    },
  },
});

export const { setRelatedArticles } = relatedArticlesSlice.actions;

export default relatedArticlesSlice.reducer;
