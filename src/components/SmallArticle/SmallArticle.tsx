import React, {FC} from 'react';
import {beautifyDate} from "../../assets/utils/utils";

import './SmallArticle.css';

interface Props {
    title: string;
    source: string;
    date: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const SmallArticle: FC<Props> = ({ title, source, date, onClick }) => {
    return (
        <article className="small-article" onClick={onClick}>
            <h2 className="small-article__title">{title}</h2>
            <span className="article-date">
        {source}
      </span>
            <span className="article-source">{beautifyDate(date)}</span>
        </article>
    )

};

export default SmallArticle;
