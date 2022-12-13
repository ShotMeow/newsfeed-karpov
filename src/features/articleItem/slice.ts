import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleItemAPI } from './types';

interface InitialState {
  item: ArticleItemAPI | null;
}

const initialState: InitialState = {
  item: null,
};

export const articleItemSlice = createSlice({
  name: 'articleItem',
  initialState,
  reducers: {
    setArticleItem: (state, action: PayloadAction<ArticleItemAPI | null>) => {
      state.item = action.payload;
    },
  },
});

export const { setArticleItem } = articleItemSlice.actions;

export default articleItemSlice.reducer;
