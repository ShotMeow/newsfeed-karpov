import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from './types';

const initialState: Category[] = [];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      return action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
