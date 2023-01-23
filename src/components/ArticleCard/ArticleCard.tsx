import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './ArticleCard.css';
import { Source } from '@features/sources/components/Source/Source';
import { beautifyDate } from '@app/utils';
import { categoryTitles } from '@features/categories/constants';
import { CategoryNames } from '@features/categories/types';
import Image from '@components/Image/Image';

interface Props {
  id: number;
  title: string;
  image?: string;
  category?: CategoryNames;
  description?: string;
  source?: string;
  date?: string;
  className?: string;
}

export const ArticleCard: FC<Props> = ({
  id,
  title,
  image = '',
  category,
  description = '',
  source = '',
  date = '',
  className,
}) => {
  const hasDescription = description.length > 0;
  const hasImage = image.length > 0;

  return (
    <Link
      to={`/article/${id}`}
      className={classNames(
        'article-card',
        {
          'article-card--has-description': hasDescription,
        },
        className
      )}
    >
      <article className="article-card__in">
        {hasImage && <Image className="article-card__image" src={image} alt={title} />}
        <div className="article-card__content">
          <h3 className="article-card__title">{title}</h3>
          {hasDescription && <span className="article-card__description">{description}</span>}
          <div className="article-card__info">
            {category && category.length > 0 && (
              <span className="article-card__category">{categoryTitles[category]}</span>
            )}
            {date.length > 0 && <span className="article-card__date">{beautifyDate(date)}</span>}
            {source.length > 0 && <Source>{source}</Source>}
          </div>
        </div>
      </article>
    </Link>
  );
};
