export const SmallArticle = ({title, date, source}) => {
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