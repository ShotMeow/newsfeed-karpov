import { Category } from '@features/categories/types';
import { Source } from '@features/sources/types';

export type TArticleImage = {
  width: number;
  height: number;
  type: string;
  format: string;
  size: number;
  url: string;
};

export type TColor = [number, number, number];

export type TExtendedImage = {
  source: string;
  variants: TArticleImage[];
  stripped?: TArticleImage | null;
  // colors?: TColor[] | null;
};

export interface ArticleItemAPI {
  id: number;
  lang: string;
  date: string;
  title: string;
  description: string;
  image: TExtendedImage;
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
  image: TExtendedImage;
  source_id: number;
  category_id: number;
}
