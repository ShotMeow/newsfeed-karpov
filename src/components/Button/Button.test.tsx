import { render, screen } from '@testing-library/react';
import { Button } from '@components/Button/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
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

  test('Рендерит спиннер при пропе loading', () => {
    render(<Button loading>Привет</Button>);

    const spinner = screen.getByAltText('button_spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('Не вызывает проп onClick при пропе loading и при клике на кнопку', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} loading>
        Привет
      </Button>
    );

    userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
