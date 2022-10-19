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
}

export interface RelatedArticlesAPI {
  items: Article[];
}

export interface Source {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
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
