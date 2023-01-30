import { NewsAPI } from '@features/articlesList/types';
import { Source } from '@features/sources/types';
import { Category } from '@features/categories/types';
import { RelatedArticlesAPI } from '@features/relatedNews/types';
import { ArticleItemAPI } from '@features/articleItem/types';
import { IPartnerArticleREST } from '@features/partnersArticles/types';

const API_END_POINT = 'https://frontend.karpovcourses.net/api';
const API_VERSION = 'v3';

export const apiFetchNews = (lang: string): Promise<NewsAPI> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/${lang}/news`).then((response) => response.json());
};

export const apiFetchTrends = (lang: string): Promise<NewsAPI> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/${lang}/trends`).then((response) => response.json());
};

export const apiFetchCategory = (lang: string, id: number): Promise<NewsAPI> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/${lang}/news/${id}`).then((response) => response.json());
};

export const apiFetchCategories = (): Promise<Category[]> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/categories`).then((response) => response.json());
};

export const apiFetchSources = (): Promise<Source[]> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/sources`).then((response) => response.json());
};

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesAPI> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/news/related/${id}?count=9`).then((response) => response.json());
};

export const apiFetchArticleItem = (id: number): Promise<ArticleItemAPI> => {
  return fetch(`${API_END_POINT}/${API_VERSION}/news/full/${id}`).then((response) => response.json());
};

export const apiFetchMainPartnerArticle = (): Promise<IPartnerArticleREST> => {
  return fetch(`https://firestore.googleapis.com/v1/projects/karpov-news/databases/(default)/documents/partners-posts/`)
    .then((response) => response.json())
    .then(
      ({
        documents,
      }: {
        documents: Array<{
          createTime: string;
          fields: IPartnerArticleREST;
        }>;
      }) => {
        return documents.sort((a, b) => {
          return new Date(a.createTime).getTime() - new Date(b.createTime).getTime() < 0 ? 1 : -1;
        })[0].fields;
      }
    );
};
