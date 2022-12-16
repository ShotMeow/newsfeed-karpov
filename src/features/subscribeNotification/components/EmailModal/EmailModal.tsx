import React, { FC, useState } from 'react';
import './EmailModal.css';
import { ModalWrapper } from '@components/ModalWrapper/ModalWrapper';
import { Button } from '@components/Button/Button';

interface EmailModalProps {
  onClose: VoidFunction;
  shown: boolean;
}

export const EmailModal: FC<EmailModalProps> = ({ onClose, shown }: EmailModalProps) => {
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
          <img src={require('../../../../images/cross.svg')} alt="Закрытие модального окна" />
        </button>
        <h2 className="email-modal__title">
          Хотите получать последние новости от{' '}
          <a className="email-modal__link" href="#">
            Karpov.Courses?
          </a>
        </h2>
        <p className="email-modal__text">Оставьте свой e-mail и будем на связи!</p>
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
          <input type="email" required className="email-modal__input" placeholder="Введите вашу почту" />
          <Button type="submit" loading={sending}>
            Подписаться
          </Button>
        </form>
      </div>
    </ModalWrapper>
  );
};
