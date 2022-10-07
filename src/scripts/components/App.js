import { Navigation } from "./Navigation.js";
import { MainArticle } from "./MainArticle.js";
import { SmallArticle } from "./SmallArticle.js";
import React from 'react';
import { categories } from "../utils";
import '../../styles/style.css';

export const App = () => {
    const [category, setCategory] = React.useState('index');
    const [articles, setArticles] = React.useState({
        items: [],
        categories: [],
        sources: []
    });

    const onNavClick = (e) => {
        e.preventDefault();
        setCategory(e.currentTarget.dataset.href);
    }

    React.useEffect(() => {
        fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categories.find(item => item.value === category).id || '')
            .then(response => response.json())
            .then(response => setArticles(response))
    }, [category])

    return (
        <>
            <header className="header">
                <div className="container">
                    <Navigation category={category} onNavClick={onNavClick} />
                </div>
            </header>
            <main className="main">
                <section className="news">
                    <div className="grid container">
                        <section className="news__main-column">
                            {articles.items.slice(0, 3).map((item) => {
                                return (
                                    <MainArticle
                                        key={item.title}
                                        title={item.title}
                                        description={item.description}
                                        image={item.image}
                                        category={articles.categories.find(({id}) => item.category_id === id).name}
                                        source={articles.sources.find(({id}) => item.source_id === id).name}
                                    />
                                )
                            })}
                        </section>
                        <aside className="news__second-column">
                            {articles.items.slice(3, 12).map((item) => {
                                return (
                                    <SmallArticle
                                        key={item.title}
                                        title={item.title}
                                        source={articles.sources.find(({id}) => item.source_id === id).name}
                                        date={item.date}
                                    />
                                )
                            })}
                        </aside>
                    </div>
                </section>
            </main>
            <footer className="footer">
                <div className="container">
                    <Navigation category={category} onNavClick={onNavClick} className='footer__navigation' />
                    <div className="footer__last-column grid">
                        <p className="footer__about">Сделано на Frontend курсе в <a className="footer__link" target="_blank" href="src/scripts/components/App">Karpov.Courses</a></p>
                        <span className="footer__copyright">© 2022</span>
                    </div>
                </div>
            </footer>
        </>
    );
}
