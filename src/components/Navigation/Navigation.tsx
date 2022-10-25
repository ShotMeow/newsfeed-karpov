import React, { FC } from 'react';
import logo from '../../assets/images/logo.svg';

import './Navigation.css';
import { categoryNames } from '../../assets/utils/utils';
import { NavLink } from 'react-router-dom';

interface Props {
  className?: string;
  placement: 'header' | 'footer';
}

const Navigation: FC<Props> = ({ className = '', placement = 'header' }) => {
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <NavLink to="/" className="navigation__logo">
        <img className="navigation__logo-image" src={logo} alt="Логотип" />
      </NavLink>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'sport', 'karpov'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) => 'navigation__link' + (isActive ? ' navigation__link--active' : '')}
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
