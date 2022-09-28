let data = {}

const mainNewsContainer = document.querySelector('.news__main-column')
const smallNewsContainer = document.querySelector('.news__second-column')

const escapeString = (string) => {
    const symbols = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }

    return string.replace(/[&<>]/g, (tag) => {
        return symbols[tag] || tag
    })
}

const renderNews = categoryId => {
    fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${categoryId ? categoryId : ''}`)
        .then(response => response.json())
        .then(responseData => {
            data = responseData
            const mainNews = data.items.slice(0, 3)
            const smallNews = data.items.slice(3, 12)

            mainNews.forEach((item) => {
                const template = document.createElement("template")
                const source = data.sources.find((source) => source.id === item.source_id)
                const category = data.categories.find((category) => category.id === item.category_id)

                template.innerHTML = `
                <article class="news-item">
                    <div class="news-item__image-container"><img class="news-item__image" src="${encodeURI(item.image)}" alt="Картинка"></div>
                    <div class="news-item__about">
                        <span class="news-item__category">${escapeString(category.name)}</span>
                        <h2 class="news-item__title">${escapeString(item.title)}</h2>
                        <p class="news-item__description">${escapeString(item.description)}</p>
                        <span class="news-item__source">${escapeString(source.name)}</span>
                    </div>
                </article>
                `

                mainNewsContainer.appendChild(template.content)
                })

                smallNews.forEach((item) => {
                    const template = document.createElement("template")
                    const source = data.sources.find((source) => source.id === item.source_id)
                    const date = new Date(item.date).toLocaleDateString('ru-RU', {
                        month: 'long',
                        day: 'numeric'
                    })

                            template.innerHTML = `
                    <article class="aside-item">
                        <h3 class="aside-item__title">${escapeString(item.title)}</h3>
                        <div class="aside-item__wrapper">
                            <span class="aside-item__date">${date}</span>
                            <span class="aside-item__source">${escapeString(source.name)}</span>
                        </div>
                    </article>
                `
                smallNewsContainer.appendChild(template.content)
                })
        })
}