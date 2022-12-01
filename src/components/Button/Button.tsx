import React, { ButtonHTMLAttributes, FC } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, loading = false, onClick, ...restProps }: ButtonProps) => {
  return (
    <button {...restProps} className="button" onClick={loading ? undefined : onClick}>
      {children}
      {loading && (
        <span className="button__loading">
          <img className="button__spinner" src={require('../../assets/images/spinner.svg')} alt="Спиннер" />
        </span>
      )}
    </button>
  );
};
