import React, { ElementType, FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import './Title.css';

interface TitleProps {
  Component?: ElementType;
  className?: string;
}

export const Title: FC<PropsWithChildren<TitleProps>> = ({ Component = 'h1', children, className }) => {
  return <Component className={classNames('Title', className)}>{children}</Component>;
};
