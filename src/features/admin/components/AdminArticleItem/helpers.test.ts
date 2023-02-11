import { getErrors } from '@features/admin/components/AdminArticleItem/helpers';
import { InputName } from '@features/admin/components/AdminArticleItem/types';

// Не должно быть пустых полей
// Название должно быть до 20 символов
// Подводка должна быть до 140 символов
// Текст должен быть минимум 140 символов
describe('getErrors', () => {
  let data: [InputName, FormDataEntryValue][] = [];

  beforeEach(() => {
    // Arrange
    data = [
      ['company-name', 'Рога и Копыта'],
      ['title', 'Заголовок'],
      ['description', 'Описание'],
      [
        'text',
        'Когда я добавлял шрифты на сайты, сначала проверял, если ли шрифт на Google Fonts. Если был, я спокойно подключал по инструкции и работал дальше.',
      ],
      ['image', 'image'],
    ];
  });

  test('Возвращает объект без ошибок, если передать верные данные', async () => {
    // Act
    const errors = await getErrors(data);

    // Assert
    expect(errors).toEqual({
      'company-name': '',
      title: '',
      description: '',
      text: '',
      image: '',
    });
  });

  test.each([
    { name: 'company-name' as InputName },
    { name: 'title' as InputName },
    { name: 'description' as InputName },
    { name: 'text' as InputName },
    { name: 'image' as InputName },
  ])('Возвращает ошибку, если $name не заполнено', async ({ name }) => {
    data = data.map((item) => {
      if (item[0] === name) {
        return [item[0], ''];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors[name].length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в title, если передать значение больше 20 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'title') {
        return [item[0], 'title title title title'];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.title.length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в description, если передать значение больше 140 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'description') {
        return [
          item[0],
          'Возвращает объект с ошибкой в description, если передать значение больше 140 символов Возвращает объект с ошибкой в description, если передать значение больше 140 символов',
        ];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.description.length).toBeGreaterThan(0);
  });

  test('Возвращает объект с ошибкой в text, если передать значение меньше 140 символов', async () => {
    data = data.map((item) => {
      if (item[0] === 'text') {
        return [item[0], 'text'];
      }

      return item;
    });

    const errors = await getErrors(data);

    expect(errors.text.length).toBeGreaterThan(0);
  });
});

const promiseFunc = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ok');
    }, 2000);
  });
};

describe('Timeout Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Test Timeout', () => {
    const promise = promiseFunc();

    jest.runAllTimers();
    return expect(promise).resolves.toBe('ok');
  });
});
