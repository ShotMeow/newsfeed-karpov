import React, { FC } from 'react';

import './SkeletonText.css';
import classNames from 'classnames';
import { repeat } from '@app/utils';

interface Props {
  rowsCount?: number;
  dark?: boolean;
}

const SkeletonText: FC<Props> = ({ rowsCount = 1, dark = false }) => {
  return (
    <span
      className={classNames('skeleton-text', {
        'skeleton-text--dark': dark,
      })}
    >
      {repeat((i) => {
        return <span key={i} className="skeleton-text__row skeleton-gradient" />;
      }, rowsCount)}
    </span>
  );
};

export default SkeletonText;
