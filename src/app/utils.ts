export const beautifyDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};

export function repeat<T>(cb: (i: number) => T, times = 1): T[] {
  const res = [];

  for (let i = 0; i < times; i++) {
    res.push(cb(i));
  }

  return res;
}
