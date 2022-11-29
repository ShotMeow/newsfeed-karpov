import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './Logo.css';

export const Logo: FC = () => {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={logo} alt="Логотип" />
    </NavLink>
  );
};
