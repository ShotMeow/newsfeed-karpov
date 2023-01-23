import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './SidebarArticleCard.css';
import { beautifyDate } from '@app/utils';
import Image from '@components/Image/Image';
import { useTranslation } from 'react-i18next';

interface Props {
  id: number;
  title: string;
  source: string;
  date: string;
  image: string;
  className?: string;
}

export const SidebarArticleCard: FC<Props> = ({ id, title, source, date, image, className }) => {
  const { i18n } = useTranslation();

  return (
    <Link to={`/article/${id}`} className={classNames('sidebar-article-card', className)}>
      <article className="sidebar-article-card__in">
        <div className="sidebar-article-card__media">
          <Image className="sidebar-article-card__image" src={image} alt={title} />
          <div className="sidebar-article-card__date">{beautifyDate(date, i18n.language)}</div>
        </div>
        <h3 className="sidebar-article-card__title">{title}</h3>
        <div className="sidebar-article-card__source">{source}</div>
      </article>
    </Link>
  );
};
