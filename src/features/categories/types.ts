export enum CategoryNames {
  politics = 'politics',
  sport = 'sport',
  tech = 'tech',
  'karpov.courses' = 'karpov.courses',
  fashion = 'fashion',
  other = 'other',
}

export interface Category {
  id: number;
  name: CategoryNames;
}
