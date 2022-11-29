export interface NewsAPI {
  sources: Source[];
  categories: Category[];
  items: Article[];
}

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

export interface RelatedArticlesAPI {
  items: Article[];
}

export interface Source {
  id: number;
  name: string;
  site?: string;
}

export type CategoryNames = 'politics' | 'sport' | 'tech' | 'karpov.courses' | 'fashion' | 'other';

export interface Category {
  id: number;
  name: CategoryNames;
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

export interface IPartnerArticle {
  id: string;
  'company-name': string;
  title: string;
  description: string;
  text: string;
  image: string;
  created: {
    nanoseconds: number;
    seconds: number;
  };
}
