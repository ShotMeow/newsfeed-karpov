import React, { FC } from 'react';

export const Cross: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5L19 19M19 5L5 19" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
