import React, { FC } from 'react';
import './Hero.css';
import classNames from 'classnames';
import { Title } from '@components/Title/Title';
import Image from '@components/Image/Image';

interface HeroProps {
  image?: string;
  title: string;
  text?: string;
  className?: string;
}

export const Hero: FC<HeroProps> = ({ image = '', title, text = '', className }) => {
  const hasImage = image.length > 0;

  return (
    <section
      className={classNames(
        'hero',
        {
          'hero--no-image': !hasImage,
        },
        className
      )}
    >
      <div className="hero__in">
        {hasImage && <Image src={image} className="hero__image" alt={title} />}
        <div className="hero__container container">
          <div className="hero__content">
            <Title className="hero__title">{title}</Title>
            {text.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
