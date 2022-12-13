import { RootState } from '@app/store';
import { Source } from './types';

export const getSources = (state: RootState): Source[] => state.sources;
