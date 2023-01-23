import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import './Source.css';
import { useTranslation } from 'react-i18next';

interface SourceProps {
  className?: string;
  href?: string;
}

export const Source: FC<PropsWithChildren<SourceProps>> = ({ children, className, href }) => {
  const { t } = useTranslation();

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={classNames('source', 'source--link', className)}>
      {children || t('source_placeholder')}
    </a>
  ) : (
    <span className={classNames('source', className)}>{children || t('source_placeholder')}</span>
  );
};
