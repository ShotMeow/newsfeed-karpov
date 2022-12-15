import { CategoryNames } from './types';

export const categoryIds: Record<CategoryNames, number> = {
  sport: 2,
  tech: 1,
  ['karpov.courses']: 6,
  fashion: 3,
  politics: 4,
  other: 5,
};

export const categoryTitles: Record<CategoryNames, string> = {
  fashion: 'Мода',
  tech: 'Технологии',
  sport: 'Спорт',
  ['karpov.courses']: 'Karpov',
  politics: 'Политика',
  other: 'Прочее',
};
