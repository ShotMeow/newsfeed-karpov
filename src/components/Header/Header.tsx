import React, { FC } from 'react';
import './Header.css';
import { useAdaptive } from '@app/hooks';
import { DesktopHeader } from '@components/Header/DesktopHeader';
import { MobileHeader } from '@components/Header/MobileHeader';

export const Header: FC = () => {
  const { isMobile } = useAdaptive();

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};
