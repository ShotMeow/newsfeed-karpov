import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Source } from './types';

const initialState: Source[] = [];

export const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<Source[]>) => {
      return action.payload;
    },
  },
});

export const { setSources } = sourcesSlice.actions;

export default sourcesSlice.reducer;
