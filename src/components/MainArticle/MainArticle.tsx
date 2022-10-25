import React, { FC } from 'react';

import './MainArticle.css';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  source: string;
}

const MainArticle: FC<Props> = ({ id, title, image, category, description, source }) => {
  return (
    <Link to={`/article/${id}`} className="main-article">
      <article className="main-article__container">
        <div className="main-article__image-container">
          <img className="article-img main-article__img" src={image} alt="Фото новости" />
        </div>
        <div className="main-article__content">
          <span className="article-category">{category}</span>
          <h2 className="main-article__title">{title}</h2>
          <p className="main-article__text">{description}</p>
          <span className="article-source main-article__caption">{source}</span>
        </div>
      </article>
    </Link>
  );
};

export default MainArticle;
