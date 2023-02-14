import { render, screen } from '@testing-library/react';
import { Button } from '@components/Button/Button';
import React from 'react';
import { initI18n } from '@features/locale/utils';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  beforeEach((done) => {
    initI18n(done);
  });

  test('Рендер кнопки', () => {
    render(<Button>Кнопка</Button>);

    expect(screen.getByText('Кнопка')).toBeInTheDocument();
  });

  test('Вызывает проп onClick при клике на кнопку', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Привет</Button>);

    userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
