import { categories } from "../utils.js";

export const Navigation = ({category, onNavClick, className = ''}) => {
    return (
        <nav className={`navigation grid ${className}`}>
            <a onClick={onNavClick} data-href="index" className="navigation__logo">
                <img className="navigation__image" src="src/images/logo.svg" alt="Логотип" />
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