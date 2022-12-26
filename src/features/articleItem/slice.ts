import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleItemAPI } from '@features/articleItem/types';

interface InitialState {
  items: Record<number, ArticleItemAPI>;
}

const initialState: InitialState = {
  items: {},
};

export const articleItemSlice = createSlice({
  name: 'articleItem',
  initialState,
  reducers: {
    setArticleItem: (state, action: PayloadAction<ArticleItemAPI>) => {
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload,
      };
    },
  },
});

export const { setArticleItem } = articleItemSlice.actions;

export default articleItemSlice.reducer;
