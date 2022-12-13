import { Navigate } from 'react-router-dom';
import React, { FC, PropsWithChildren } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuthContext } from '@features/auth/AuthContextProvider';

export const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      isAuthenticated ? {children} : <Navigate to="/sign-in" />
    </>
  );
};
