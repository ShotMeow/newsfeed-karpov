import { CategoryNames } from './types';

export const categoryIds: Record<CategoryNames, number> = {
  sport: 2,
  tech: 1,
  ['karpov.courses']: 6,
  fashion: 3,
  other: 5,
  politics: 4,
};

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  sport: 'Спорт',
  ['karpov.courses']: 'Karpov',
  other: 'Прочее',
  politics: 'Политика',
};
