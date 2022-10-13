export const categoryIds = {
    index: 0,
    sport: 2,
    technologies: 1,
    karpov: 6,
    fashion: 3,
}

export const categoryNames = {
    index: 'Главная',
    fashion: 'Мода',
    technologies: 'Технологии',
    sport: 'Спорт',
    karpov: 'Karpov'
}

export const beautifyDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric'
    });
}
