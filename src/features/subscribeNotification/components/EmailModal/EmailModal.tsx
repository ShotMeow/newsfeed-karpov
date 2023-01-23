import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './EmailModal.css';
import { MODAL_DESCRIPTION_ID, MODAL_LABEL_ID, ModalWrapper } from '@components/ModalWrapper/ModalWrapper';
import { Button } from '@components/Button/Button';

interface EmailModalProps {
  onClose: VoidFunction;
  shown: boolean;
}

export const EmailModal: FC<EmailModalProps> = ({ onClose, shown }: EmailModalProps) => {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);

  const _onClose = () => {
    if (!sending) {
      onClose();
    }
  };

  return (
    <ModalWrapper shown={shown} onClose={_onClose}>
      <div className="email-modal">
        <button className="email-modal__close" onClick={_onClose}>
          <img
            src={require('../../../../images/cross.svg')}
            alt={t('email_modal_button_close') || ''}
            className="email-modal__close-img"
          />
        </button>
        <h2
          className="email-modal__title"
          id={MODAL_LABEL_ID}
          dangerouslySetInnerHTML={{
            __html: t('email_modal_title', { link: `<a class="email-modal__link" href="#">Karpov.Courses?</a>` }),
          }}
        />
        <p className="email-modal__text" id={MODAL_DESCRIPTION_ID}>
          {t('email_modal_text')}
        </p>
        <form
          className="email-modal__form"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            fetch('https://frontend.karpovcourses.net/api/v2/subscribe')
              .then(() => {
                setSending(false);
                _onClose();
              })
              .catch(() => {
                setSending(false);
              });
          }}
        >
          <input
            type="email"
            required
            className="email-modal__input"
            placeholder={t('email_modal_input_placeholder') || ''}
          />
          <Button type="submit" loading={sending}>
            {t('email_modal_button_action')}
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};
