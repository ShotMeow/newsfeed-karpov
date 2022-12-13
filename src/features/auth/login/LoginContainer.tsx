import React, { FC, Reducer, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProviderId } from 'firebase/auth';
import { LoginForm, TLoginField } from '../components/LoginForm/LoginForm';
import { Divider, Link, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';

import './LoginContainer.css';
import { validateEmail } from './utils';
import { ALLOWED_OAUTH_PROVIDERS, useAuthContext } from '../AuthContextProvider';
import { TLoginWithEmailAndPasswordResult } from '../types';

type TLoginFormFieldState = Omit<TLoginField, 'onChange'>;

type Action = { type: 'change' | 'error'; value: string };

function reducer(state: TLoginFormFieldState, action: Action): TLoginFormFieldState {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        error: false,
        helper: '',
        value: action.value,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    default:
      throw new Error();
  }
}

const getOAuthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" />;
    case ProviderId.GITHUB:
      return <GitHubIcon fontSize="inherit" />;
    default:
      return <LoginIcon fontSize="inherit" />;
  }
};

export const LoginContainer: FC = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const { state: locationState } = useLocation<{ from: string }>();
  const { loginWithEmailAndPassword, loginWithOauthPopup } = useAuthContext();
  const [authError, setAuthError] = useState('');
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFormFieldState, Action>>(reducer, {
    name: 'email',
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFormFieldState, Action>>(reducer, {
    name: 'password',
    value: '',
  });

  const processLogin = (loginPromise: Promise<TLoginWithEmailAndPasswordResult>) => {
    return loginPromise
      .then(() => {
        navigate(locationState?.from || '/admin');
      })
      .catch((error) => {
        setAuthError(error?.message || 'error');
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
      valid = false;
    }

    if (passwordState.value.length <= 6) {
      dispatchPassword({
        type: 'error',
        value: 'Длинна пароля меньше 6-ти символов',
      });
      valid = false;
    }

    if (valid) {
      processLogin(loginWithEmailAndPassword(emailState.value, passwordState.value));
    }
  };

  const onOauthLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const dataset = (e.target as HTMLElement)?.closest<HTMLLinkElement>('.oauth-login-container__item')?.dataset;
    if (dataset?.provider) {
      processLogin(loginWithOauthPopup(dataset?.provider));
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
      <Divider />
      <div className="oauth-login-container">
        {Object.keys(ALLOWED_OAUTH_PROVIDERS).map((item) => {
          return (
            <Link
              key={item}
              href="./LoginContainer#"
              className="oauth-login-container__item"
              data-provider={item}
              onClick={onOauthLogin}
            >
              {getOAuthProviderIcon(item)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
