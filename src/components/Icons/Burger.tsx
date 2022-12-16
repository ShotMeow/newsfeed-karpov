import React, { FC } from 'react';

export const Burger: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 6H19" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 12H19" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 18H19" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
