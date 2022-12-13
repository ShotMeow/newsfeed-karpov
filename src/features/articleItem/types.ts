import { Category } from '../categories/types';
import { Source } from '../sources/types';

export interface ArticleItemAPI {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
  text: string;
  category: Category;
  source: Source;
  author?: string;
}

export interface Article {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: string;
  source_id: number;
  category_id: number;
}
