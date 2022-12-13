import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchSources } from '@app/api';
import { setSources } from './slice';

export const fetchSources = createAsyncThunk('api/fetchSources', (_, thunk) => {
  apiFetchSources().then((sources) => {
    thunk.dispatch(setSources(sources));
  });
});
