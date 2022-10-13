import React, {FC} from 'react';
import SmallArticle from "../SmallArticle/SmallArticle";
import {NewsAPI} from "../../assets/types/api.types";
import MainArticle from "../MainArticle/MainArticle";

import './Articles.css';

interface Props {
    articles: NewsAPI;
    onArticleClick: (id: number) => void;
}

const Articles: FC<Props> = ({ articles, onArticleClick }) => {
    return (
        <section className="articles">
            <div className="container grid">
                <section className="articles__big-column">
                    {articles.items.slice(0, 3).map((item) => {
                        const category = articles.categories.find(({id}) => item.category_id === id);
                        const source = articles.sources.find(({id}) => item.source_id === id);

                        return (
                            <MainArticle
                                key={item.title}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                category={category ? category.name : ''}
                                source={source?.name || ''}
                                onClick={() => onArticleClick(item.id)}
                            />
                        )
                    })}
                </section>
                <section className="articles__small-column">
                    {articles.items.slice(3, 12).map((item) => {
                        const source = articles.sources.find(({id}) => item.source_id === id);
                        return (
                            <SmallArticle
                                key={item.title}
                                title={item.title}
                                source={source?.name || ''}
                                date={item.date}
                                onClick={() => onArticleClick(item.id)}
                            />
                        )
                    })}
                </section>
            </div>
        </section>
    )

};

export default Articles;
