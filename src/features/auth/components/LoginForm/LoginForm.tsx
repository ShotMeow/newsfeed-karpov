import { Box, Stack } from '@mui/material';
import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export type TLoginField = {
  name: string;
  error?: boolean;
  helper?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TProps = {
  className?: string;
  email: TLoginField;
  password: TLoginField;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const LoginForm: FC<TProps> = ({ className, email, password, onSubmit }) => {
  return (
    <Box className={className}>
      <form onSubmit={onSubmit} method="POST">
        <Stack direction="column" spacing={1}>
          <TextField
            fullWidth
            label={email.name}
            variant="outlined"
            name={email.name}
            value={email.value}
            onChange={email.onChange}
            error={!!email.error}
            helperText={email.helper}
          />
          <TextField
            fullWidth
            type="password"
            label={password.name}
            variant="outlined"
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            error={!!password.error}
            helperText={password.helper}
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Войти
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
