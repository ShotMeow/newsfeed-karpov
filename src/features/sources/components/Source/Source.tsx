import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import './Source.css';

interface SourceProps {
  className?: string;
  href?: string;
}

export const Source: FC<PropsWithChildren<SourceProps>> = ({ children = 'Источник', className, href }) => {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classNames('source', 'source--link', className)}>
      {children}
    </a>
  ) : (
    <span className={classNames('source', className)}>{children}</span>
  );
};
