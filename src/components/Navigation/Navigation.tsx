import React, {FC} from 'react';
import logo from '../../assets/images/logo.svg';

import './Navigation.css';
import {categoryNames} from "../../assets/utils/utils";

interface Props {
    onNavClick: (event: React.MouseEvent<HTMLElement>) => void;
    currentCategory: string;
    className?: string;
    placement: 'header' | 'footer';
}

const Navigation: FC<Props> = ({ onNavClick, currentCategory, className = '', placement = 'header' }) => {
    return (
        <nav className={`grid navigation navigation--${placement} ${className}`}>
            <a onClick={onNavClick} className="navigation__logo" data-href="index" href="#">
                <img className="navigation__logo-image" src={logo} alt="Логотип" />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
                    return (
                        <li className="navigation__item" key={item}>
                            <a
                                onClick={onNavClick}
                                className={`navigation__link ${currentCategory === item ? 'navigation__link--active' : '' }`}
                                data-href={item}
                                href="#"
                            >
                                {/* @ts-ignore */}
                                {categoryNames[item]}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

};

export default Navigation;
