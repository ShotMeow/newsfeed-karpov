export const beautifyDate = (date: string, lang: string): string => {
  return new Date(date).toLocaleDateString(lang, {
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

export const setMeta = (meta: Record<string, string>): void => {
  Object.entries(meta).forEach(([property, content]) => {
    const metaTag = document.head.querySelector(`meta[property="${property}"]`);
    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      const tag = document.createElement('meta');
      tag.setAttribute('property', property);
      tag.setAttribute('content', content);

      document.head.appendChild(tag);
    }
  });
};
