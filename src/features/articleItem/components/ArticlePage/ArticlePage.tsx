import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './ArticlePage.css';
import { beautifyDate, repeat, setMeta } from '@app/utils';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Title } from '@components/Title/Title';
import { Source } from '@features/sources/components/Source/Source';
import { getCachedArticleItem } from '@features/articleItem/selectors';
import { getRelatedArticles } from '@features/relatedNews/selectors';
import { getSources } from '@features/sources/selectors';
import { fetchArticleItem } from '@features/articleItem/actions';
import { fetchRelatedArticles } from '@features/relatedNews/actions';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { useAdaptive } from '@app/hooks';
import { ArticleCardSkeleton } from '@components/ArticleCard/ArticleCardSkeleton';
import SkeletonText from '@components/SkeletonText/SkeletonText';

export const ArticlePage: FC = () => {
  const { id }: { id?: string } = useParams();
  const dispatch = useDispatch();
  const articleItem = useSelector(getCachedArticleItem(Number(id)));
  const relatedArticles = useSelector(getRelatedArticles(Number(id)));
  const sources = useSelector(getSources);
  const hasFullArticle = !!articleItem?.text;
  const [loading, setLoading] = useState(!hasFullArticle);
  const { isDesktop } = useAdaptive();
  const { t, i18n } = useTranslation();
  const lastLoadedId = useRef<number | null | undefined>(articleItem?.id);

  useEffect(() => {
    if (!articleItem) {
      return;
    }

    setMeta({
      'og:title': `${articleItem.title} — KC News`,
      'og:description': articleItem.description,
      'og:url': window.location.href,
      'og:locale': articleItem.lang,
      'og:image': articleItem.image.source,
    });
  }, [articleItem]);

  useEffect(() => {
    lastLoadedId.current = articleItem?.id;
  }, [articleItem]);

  React.useLayoutEffect(() => {
    if (!articleItem?.text) {
      setLoading(true);
      Promise.all([dispatch(fetchArticleItem(Number(id))), dispatch(fetchRelatedArticles(Number(id)))]).then(
        (responses) => {
          // @ts-ignore
          if (responses.every((response) => !response.error)) {
            setLoading(false);
          }
        }
      );
    }
  }, [id]);

  const hero = useMemo(() => {
    if (!articleItem || (!articleItem?.title && !articleItem.image)) {
      return <HeroSkeleton hasText={true} className="article-page__hero" />;
    }

    const autoHeight = !!lastLoadedId.current;
    return (
      <Hero
        key={articleItem.id}
        title={articleItem.title}
        autoHeight={autoHeight}
        image={articleItem.image}
        className="article-page__hero"
        fullTitle
      />
    );
  }, [articleItem]);

  const mainText = useMemo(() => {
    return articleItem?.text ? articleItem.text : <SkeletonText rowsCount={6} />;
  }, [articleItem]);

  const sourceText = useMemo(() => {
    if (!articleItem) {
      return <SkeletonText />;
    }
    return (
      <>
        <span className="article-page__category">{t(`category_${articleItem.category.name}`)}</span>
        <span className="article-page__date">{beautifyDate(articleItem.date, i18n.language)}</span>
        {articleItem.link.length > 0 && (
          <Source className="article-page__source" href={articleItem.link}>
            {articleItem.source?.name}
          </Source>
        )}
      </>
    );
  }, [articleItem]);

  if (loading) {
    return (
      <div className="article-page" aria-label={t('loading') || ''}>
        <div aria-hidden>
          {hero}
          <div className="container article-page__main">
            <div className="article-page__info">{sourceText}</div>
            <div className="grid">
              <div className="article-page__content">
                <p>{mainText}</p>
              </div>

              {isDesktop && (
                <aside className="article-page__sidebar">
                  {repeat((i) => {
                    return <SidebarArticleCardSkeleton key={i} className="article-page__sidebar-item" />;
                  }, 3)}
                </aside>
              )}
            </div>
          </div>

          <section className="article-page__related-articles">
            <div className="container">
              <Title Component="h2" className="article-page__related-articles-title">
                {t('article_page_recent_title')}
              </Title>
              <div className="grid article-page__related-articles-list">
                {repeat((i) => {
                  return (
                    <ArticleCardSkeleton
                      key={i}
                      hasImage={false}
                      hasDescription={false}
                      className="article-page__related-articles-item"
                    />
                  );
                }, 3)}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (articleItem === null) {
    return null;
  }

  return (
    <div className="article-page">
      <div>
        {hero}
        <div className="container article-page__main">
          <section className="article-page__info" aria-label={t('Информация о статье') || ''}>
            {sourceText}
          </section>
          <section className="grid" aria-label={t('article_page_title') || ''}>
            <div className="article-page__content">
              <p>{mainText}</p>
            </div>

            {isDesktop && (
              <aside className="article-page__sidebar" aria-label={t('article_page_sub_article_title') || ''}>
                {relatedArticles.slice(3, 9).map((item) => {
                  const source = sources.find(({ id }) => item.source_id === id);

                  return (
                    <SidebarArticleCard
                      className="article-page__sidebar-item"
                      date={item.date}
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      source={source?.name || ''}
                      image={item.image}
                    />
                  );
                })}
              </aside>
            )}
          </section>
        </div>

        <section className="article-page__related-articles">
          <div className="container">
            <Title Component="h2" className="article-page__related-articles-title">
              {t('article_page_recent_title')}:
            </Title>
            <div className="grid article-page__related-articles-list">
              {relatedArticles.slice(0, 3).map((item) => {
                const source = sources.find(({ id }) => item.source_id === id);

                return (
                  <ArticleCard
                    className="article-page__related-articles-item"
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    date={item.date}
                    source={source?.name}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
