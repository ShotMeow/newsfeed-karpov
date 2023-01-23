import { NewsAPI } from '@features/articlesList/types';
import { Source } from '@features/sources/types';
import { Category } from '@features/categories/types';
import { RelatedArticlesAPI } from '@features/relatedNews/types';
import { ArticleItemAPI } from '@features/articleItem/types';
import { IPartnerArticleREST } from '@features/partnersArticles/types';

export const apiFetchNews = (lang: string): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/news`).then((response) => response.json());
};

export const apiFetchTrends = (lang: string): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/trends`).then((response) => response.json());
};

export const apiFetchCategory = (lang: string, id: number): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/news/${id}`).then((response) => response.json());
};

export const apiFetchCategories = (): Promise<Category[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) => response.json());
};

export const apiFetchSources = (): Promise<Source[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json());
};

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) =>
    response.json()
  );
};

export const apiFetchArticleItem = (id: number): Promise<ArticleItemAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`).then((response) => response.json());
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
