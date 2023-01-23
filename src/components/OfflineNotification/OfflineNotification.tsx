import React, { FC } from 'react';
import './OfflineNotification.css';
import { useTranslation } from 'react-i18next';

export const OfflineNotification: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="offline-notification" role="status">
      {t('offline_notification_text')}
    </div>
  );
};
