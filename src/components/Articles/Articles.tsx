import React, { FC } from 'react';
import './Articles.css';
import { useParams } from 'react-router-dom';
import { PartnerArticle } from '../PartnerArticle/PartnerArticle';
import { categoryIds } from '../../assets/utils/utils';
import SmallArticle from '../SmallArticle/SmallArticle';
import { NewsAPI } from '../../assets/types/api.types';
import MainArticle from '../MainArticle/MainArticle';

export const Articles: FC = () => {
  const { categoryId = 'index' }: { categoryId?: string } = useParams();
  const [articles, setArticles] = React.useState<NewsAPI>({
    items: [],
    categories: [],
    sources: [],
  });

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[categoryId] || '')
      .then((response) => response.json())
      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [categoryId]);

  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {articles.items.slice(0, 3).map((item) => {
            const category = articles.categories.find(({ id }) => item.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return (
              <MainArticle
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category ? category.name : ''}
                source={source?.name || ''}
              />
            );
          })}
        </section>
        <section className="articles__small-column">
          {articles.items.slice(3, 12).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <SmallArticle
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

      <div className="articles__partner-article">
        <PartnerArticle />
      </div>
    </section>
  );
};
