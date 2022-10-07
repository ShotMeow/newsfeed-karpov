export const MainArticle = ({image, category, title, description, source}) => {
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
