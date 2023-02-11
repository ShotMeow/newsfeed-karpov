import { getPartnerArticle } from '@app/api';
import { partnerArticleAPIStub } from '@features/partnersArticles/stubs';
import { getDoc } from '../__mocks__/firebase/firestore';

describe('getPartnerArticle', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Возвращает статью после загрузки', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => partnerArticleAPIStub,
      id,
    } as any);

    const article = await getPartnerArticle(id);

    expect(article).toEqual({
      id: '1',
      ...partnerArticleAPIStub,
    });
  });

  test('Возвращает ошибку, если статьи нет', async () => {
    const id = '1';
    getDoc.mockResolvedValue({
      exists: () => false,
      data: () => null,
      id,
    } as any);

    const article = getPartnerArticle(id);

    await expect(article).rejects.toThrowError();
  });
});
