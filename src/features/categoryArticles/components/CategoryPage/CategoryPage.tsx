import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CategoryPage.css';
import { CategoryNames } from '@features/categories/types';
import { categoryIds, categoryTitles } from '@features/categories/constants';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Dispatch } from '@app/store';
import { fetchCategoryArticles } from '@features/categoryArticles/actions';
import { getCategoryNews } from '@features/categoryArticles/selectors';
import { getCategories } from '@features/categories/selectors';
import { getSources } from '@features/sources/selectors';
import { repeat } from '@app/utils';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { useAdaptive } from '@app/hooks';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';

export const CategoryPage: FC = () => {
  // @ts-ignore
  const { category }: { category: CategoryNames } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getCategoryNews(categoryIds[category]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);
  const { isMobile, isDesktop } = useAdaptive();

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchCategoryArticles(categoryIds[category]))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <section className="category-page">
        <HeroSkeleton title={categoryTitles[category]} className="category-page__hero" />
        <div className="container grid">
          <section className="category-page__content">
            {repeat((i) => {
              return <ArticleCardSkeleton key={i} className="category-page__item" />;
            }, 6)}
          </section>
          {isDesktop && (
            <section className="category-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton key={i} className="category-page__sidebar-item" />;
              }, 3)}
            </section>
          )}
        </div>
      </section>
    );
  }

  const mainArticles = isMobile ? articles : articles.slice(3);

  return (
    <section className="category-page">
      <Hero
        title={categoryTitles[category]}
        image={require(`@images/categories/${category}.jpg`)}
        className="category-page__hero"
      />
      <div className="container grid">
        <section className="category-page__content">
          {mainArticles.map((item) => {
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
        {isDesktop && (
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
        )}
      </div>
    </section>
  );
};
