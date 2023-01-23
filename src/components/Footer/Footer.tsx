import React, { FC } from 'react';
import { Logo } from '@components/Logo/Logo';
import { Navigation } from '@components/Navigation/Navigation';
import './Footer.css';
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo />
          <Navigation className="footer__navigation" />
        </div>
        <div
          className="footer__bottom"
          dangerouslySetInnerHTML={{
            __html: t('footer_link', {
              link: `<a class="footer__link" href="https://karpov.courses/frontend" target="_blank" rel="noreferrer">Karpov.Courses</a>`,
            }),
          }}
        />
      </div>
    </footer>
  );
};
