import { configureStore, PayloadAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import articlesListReducer from '@features/articlesList/slice';
import categoryArticlesReducer from '@features/categoryArticles/slice';
import categoriesReducer from '@features/categories/slice';
import sourcesReducer from '@features/sources/slice';
import relatedArticlesReducer from '@features/relatedNews/slice';
import articleItemReducer from '@features/articleItem/slice';

export const store = configureStore({
  reducer: {
    articlesList: articlesListReducer,
    categoryArticles: categoryArticlesReducer,
    categories: categoriesReducer,
    sources: sourcesReducer,
    relatedArticles: relatedArticlesReducer,
    articleItem: articleItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = ThunkDispatch<RootState, unknown, PayloadAction>;
export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;
