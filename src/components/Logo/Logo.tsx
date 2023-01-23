import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';
import { useTranslation } from 'react-i18next';

export const Logo: FC = () => {
  const { t } = useTranslation();

  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={logo} alt={t('logo_main') || ''} />
    </NavLink>
  );
};
