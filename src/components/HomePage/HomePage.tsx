import React, { FC } from 'react';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import './HomePage.css';
import { SidebarArticleCard } from '../SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { Link } from 'react-router-dom';
import { Title } from '../Title/Title';
import { categoryIds } from '../../assets/utils/utils';
import { Category, NewsAPI, Source } from '../../assets/types/api.types';

type CategoriesRecord = Record<Category['id'], Category>;
type SourcesRecord = Record<Source['id'], Source>;

export const HomePage: FC = () => {
  const [articles, setArticles] = React.useState<NewsAPI['items']>([]);
  const [karpovArticles, setKarpovArticles] = React.useState<NewsAPI['items']>([]);
  const [trendArticles, setTrendArticles] = React.useState<NewsAPI['items']>([]);
  const [categories, setCategories] = React.useState<CategoriesRecord>({});
  const [sources, setSources] = React.useState<SourcesRecord>([]);

  React.useEffect(() => {
    Promise.all<NewsAPI>([
      fetch('https://frontend.karpovcourses.net/api/v2/ru/news').then((res) => res.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${categoryIds['karpov.courses']}`).then((res) =>
        res.json()
      ),
      fetch('https://frontend.karpovcourses.net/api/v2/ru/trends').then((res) => res.json()),
    ]).then(([articles, karpovArticles, trendArticles]) => {
      setArticles(articles.items);
      setKarpovArticles(karpovArticles.items);
      setTrendArticles(trendArticles.items);

      setCategories(
        [articles.categories, karpovArticles.categories, trendArticles.categories]
          .flat()
          .reduce(function (acc: CategoriesRecord, categoryItem) {
            acc[categoryItem.id] = categoryItem;
            return acc;
          }, {})
      );

      setSources(
        [articles.sources, karpovArticles.sources, trendArticles.sources]
          .flat()
          .reduce(function (acc: SourcesRecord, sourceItem) {
            acc[sourceItem.id] = sourceItem;
            return acc;
          }, {})
      );
    });
  }, []);

  const firstArticle = articles[0];

  return (
    <div className="home-page">
      {firstArticle && (
        <Link className="home-page__hero-link" to={`/article/${firstArticle.id}`}>
          <Hero
            className="home-page__hero"
            image={firstArticle.image}
            title={firstArticle.title}
            text={firstArticle.description}
          />
        </Link>
      )}
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          В тренде
        </Title>
        <div className="grid">
          {trendArticles.map(({ id, title, category_id, date }) => {
            const category = categories[category_id];
            return (
              <ArticleCard
                className="home-page__trends-item"
                id={id}
                title={title}
                key={id}
                category={category?.name}
                date={date}
              />
            );
          })}
        </div>
      </section>
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          Karpov
        </Title>
        <div className="grid">
          <section className="home-page__content">
            {karpovArticles.slice(2, 6).map((item) => {
              return (
                <ArticleCard
                  className="home-page__article-card"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  source={sources[item.source_id]?.name}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
          <section className="home-page__sidebar">
            {karpovArticles.slice(0, 2).map((item) => {
              return (
                <SidebarArticleCard
                  className="home-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={sources[item.source_id]?.name}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
        </div>
      </section>
      <div className="home-page__promo" />
      <section className="container grid home-page__section">
        <section className="home-page__content">
          {articles.slice(4).map((item) => {
            return (
              <ArticleCard
                className="home-page__article-card"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                source={sources[item.source_id]?.name}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </section>
        <section className="home-page__sidebar">
          {articles.slice(1, 4).map((item) => {
            return (
              <SidebarArticleCard
                className="home-page__sidebar-item"
                key={item.id}
                id={item.id}
                title={item.title}
                source={sources[item.source_id]?.name}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </section>
      </section>
    </div>
  );
};
