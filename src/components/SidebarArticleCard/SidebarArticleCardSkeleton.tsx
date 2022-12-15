import React, { FC } from 'react';
import classNames from 'classnames';
import './SidebarArticleCard.css';
import SkeletonText from '@components/SkeletonText/SkeletonText';
import Image from '@components/Image/Image';

interface Props {
  className?: string;
}

export const SidebarArticleCardSkeleton: FC<Props> = ({ className }: Props) => {
  return (
    <div className={classNames('sidebar-article-card', className)}>
      <div className="sidebar-article-card__media">
        <Image className="sidebar-article-card__image" skeleton />
      </div>
      <h3 className="sidebar-article-card__title">
        <SkeletonText rowsCount={3} />
      </h3>
      <div className="sidebar-article-card__source">
        <SkeletonText />
      </div>
    </div>
  );
};
