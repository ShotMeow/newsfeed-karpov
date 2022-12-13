import { RootState } from '@app/store';
import { Category } from './types';

export const getCategories = (state: RootState): Category[] => state.categories;
