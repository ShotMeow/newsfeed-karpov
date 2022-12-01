import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './SidebarArticleCard.css';
import classNames from 'classnames';
import { beautifyDate } from '../../assets/utils/utils';

interface Props {
  id: number;
  title: string;
  source: string;
  date: string;
  image: string;
  className?: string;
}

export const SidebarArticleCard: FC<Props> = ({ id, title, source, date, image, className }) => {
  return (
    <Link to={`/article/${id}`} className={classNames('sidebar-article-card', className)}>
      <div className="sidebar-article-card__media">
        <img className="sidebar-article-card__image" src={image} alt="" />
        <div className="sidebar-article-card__date">{beautifyDate(date)}</div>
      </div>
      <h3 className="sidebar-article-card__title">{title}</h3>
      <div className="sidebar-article-card__source">{source}</div>
    </Link>
  );
};
