import React, { useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import './PartnerArticle.css';
import { apiFetchMainPartnerArticle } from '@app/publicApi';
import { IPartnerArticleREST } from '@features/partnersArticles/types';

export const PartnerArticle: FC = () => {
  const { t } = useTranslation();
  const [article, setArticle] = useState<IPartnerArticleREST | null>(null);

  useEffect(() => {
    (async () => {
      const article = await apiFetchMainPartnerArticle();

      setArticle(article);
    })();
  }, []);

  if (!article) {
    return null;
  }

  return (
    <article className="partner-article">
      <div className="partner-article__container container grid">
        <div className="partner-article__image-container">
          <img className="partner-article__image" src={article.image.stringValue} alt={article.title.stringValue} />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">
            {t('partner_article_caption', { name: article['company-name'] })}
          </span>
          <h2 className="partner-article__title">{article.title.stringValue}</h2>
          <p className="partner-article__text">{article.description.stringValue}</p>
        </div>
      </div>
    </article>
  );
};
