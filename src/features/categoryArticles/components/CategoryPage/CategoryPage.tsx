import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryPage.css';
import { CategoryNames } from '@features/categories/types';
import { categoryIds, categoryTitles } from '@features/categories/constants';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Dispatch } from '@app/store';
import { fetchCategoryArticles } from '@features/categoryArticles/actions';
import { getCategoryNews } from '@features/categoryArticles/selectors';
import { getCategories } from '@features/categories/selectors';
import { getSources } from '@features/sources/selectors';

export const CategoryPage: FC = () => {
  // @ts-ignore
  const { category }: { category: CategoryNames } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getCategoryNews(categoryIds[category]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);

  React.useEffect(() => {
    dispatch(fetchCategoryArticles(categoryIds[category]));
  }, [category]);

  return (
    <section className="category-page">
      <Hero title={categoryTitles[category]} image="test" className="category-page__hero" />
      <div className="container grid">
        <section className="category-page__content">
          {articles.slice(3).map((item) => {
            const category = categories.find(({ id }) => item.category_id === id);
            const source = sources.find(({ id }) => item.source_id === id);

            return (
              <ArticleCard
                className="category-page__item"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
              />
            );
          })}
        </section>
        <section className="category-page__sidebar">
          {articles.slice(0, 3).map((item) => {
            const source = sources.find(({ id }) => item.source_id === id);

            return (
              <SidebarArticleCard
                className="category-page__sidebar-item"
                image={item.image}
                key={item.id}
                id={item.id}
                title={item.title}
                source={source?.name || ''}
                date={item.date}
              />
            );
          })}
        </section>
      </div>
    </section>
  );
};
