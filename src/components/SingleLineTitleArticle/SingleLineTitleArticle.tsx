import React, { FC } from 'react';

import './SingleLineTitleArticle.css';

interface Props {
  image: string;
  title: string;
  text: string;
  category: string;
  source: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const SingleLineTitleArticle: FC<Props> = ({ image, title, source, text, category, onClick }) => {
  return (
    <article className="single-line-title-article" onClick={onClick}>
      <img className="single-line-title-article__image" src={image} alt="Картинка" />
      <span className="article-category single-line-title-article__category">{category}</span>
      <h2 className="single-line-title-article__title">{title}</h2>
      <p className="single-line-title-article__text">{text}</p>
      <span className="article-source single-line-title-article__source">{source}</span>
    </article>
  );
};

export default SingleLineTitleArticle;
