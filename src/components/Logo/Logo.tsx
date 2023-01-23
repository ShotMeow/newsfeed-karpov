import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';

export const Logo: FC = () => {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={logo} alt="Главная страница" />
    </NavLink>
  );
};
