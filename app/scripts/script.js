const categories = [
    {
        id: 0,
        title: 'Главная',
        value: 'index'
    },
    {
        id: 3,
        title: 'Мода',
        value: 'fashion'
    },
    {
        id: 1,
        title: 'Технологии',
        value: 'tech'
    },
    {
        id: 5,
        title: 'Политика',
        value: 'politics'
    },
    {
        id: 2,
        title: 'Спорт',
        value: 'sport'
    },
]

const Navigation = ({category, onNavClick, className = ''}) => {
    return (
        <nav className={`navigation grid ${className}`}>
            <a onClick={onNavClick} data-href="index" className="navigation__logo">
                <img className="navigation__image" src="app/images/logo.svg" alt="Логотип" />
            </a>
            <ul className="navigation__list">
                {categories.map((item) => {
                        return <li key={item.value} className="navigation__item">
                            <a onClick={onNavClick} data-href={item.value}
                               className={`navigation__link ${category === item.value ? 'navigation__link--active' : ''}`}>{item.title}</a>
                        </li>
                    }
                )}
            </ul>
        </nav>
    )
}

const MainArticle = ({image, category, title, description, source}) => {
    return <article className="news-item">
        <div className="news-item__image-container">
            <img className="news-item__image" src={image} alt="Картинка" />
        </div>
        <div className="news-item__about">
            <span className="news-item__category">{category}</span>
            <h2 className="news-item__title">{title}</h2>
            <p className="news-item__description">{description}</p>
            <span className="news-item__source">{source}</span>
        </div>
    </article>
}

const SmallArticle = ({title, date, source}) => {
    return <article className="aside-item">
        <h3 className="aside-item__title">{title}</h3>
        <div className="aside-item__wrapper">
            <span className="aside-item__date">
                {new Date(date).toLocaleDateString('ru-RU', {
                    month: 'long',
                    day: 'numeric'
                })}
            </span>
            <span className="aside-item__source">{source}</span>
        </div>
    </article>

}

const App = () => {
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
                        <p className="footer__about">Сделано на Frontend курсе в <a className="footer__link" target="_blank" href="https://karpov.courses/">Karpov.Courses</a></p>
                        <span className="footer__copyright">© 2022</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(<App />);