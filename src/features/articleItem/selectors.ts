import { RootState } from '@app/store';
import { ArticleItemAPI } from './types';
import { getCategories } from '../categories/selectors';
import { Category } from '../categories/types';
import { getSources } from '../sources/selectors';
import { Source } from '../sources/types';

export const getArticleItem = (state: RootState): ArticleItemAPI | null => state.articleItem.item;

export const getCachedArticleItem =
  (id: number) =>
  (state: RootState): ArticleItemAPI | null => {
    const articleItem = getArticleItem(state);

    if (articleItem) {
      return articleItem;
    }

    const articleInList = [
      state.articlesList.news,
      state.articlesList.trends,
      Object.values(state.categoryArticles).flat(),
      Object.values(state.relatedArticles).flat(),
    ]
      .flat()
      .find((item) => item.id === id);

    if (!articleInList) {
      return null;
    }

    return {
      ...articleInList,
      category: getCategories(state).find(({ id }) => id === articleInList.category_id) as Category,
      source: getSources(state).find(({ id }) => id === articleInList.source_id) as Source,
      link: '',
      text: '',
    };
  };
