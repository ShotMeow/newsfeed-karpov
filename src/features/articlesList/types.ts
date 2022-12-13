import { Article } from '../articleItem/types';
import { Category } from '../categories/types';
import { Source } from '../sources/types';

export interface NewsAPI {
  sources: Source[];
  categories: Category[];
  items: Article[];
}
