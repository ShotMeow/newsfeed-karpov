import React, {FC} from 'react';

import './RelatedSmallArticle.css';

interface Props {
    image: string;
    title: string;
    category: string;
    source: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}


const RelatedSmallArticle: FC<Props> = ({ image, category, source, title, onClick }) => {
    return (
        <article className="related-small-article" onClick={onClick}>
            <img className="related-small-article__image" src={image} />
            <div className="related-small-article__content">
                <span className="article-category related-small-article__category">{category}</span>
                <h2 className="related-small-article__title">{title}</h2>
                <span className="article-source related-small-article__source">{source}</span>
            </div>
        </article>
    );

};

export default RelatedSmallArticle;
