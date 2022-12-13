import { RootState } from '@app/store';
import { Article } from '../articleItem/types';

export const getNews = (state: RootState): Article[] => state.articlesList.news;

export const getTrends = (state: RootState): Article[] => state.articlesList.trends;
