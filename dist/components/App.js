import { Navigation } from "./Navigation.js";
import { MainArticle } from "./MainArticle.js";
import { SmallArticle } from "./SmallArticle.js";
import React from 'react';
import { categories } from "../utils";
export const App = () => {
  const [category, setCategory] = React.useState('index');
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: []
  });

  const onNavClick = e => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.href);
  };

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categories.find(item => item.value === category).id || '').then(response => response.json()).then(response => setArticles(response));
  }, [category]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Navigation, {
    category: category,
    onNavClick: onNavClick
  }))), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "news"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "news__main-column"
  }, articles.items.slice(0, 3).map(item => {
    return /*#__PURE__*/React.createElement(MainArticle, {
      key: item.title,
      title: item.title,
      description: item.description,
      image: item.image,
      category: articles.categories.find(({
        id
      }) => item.category_id === id).name,
      source: articles.sources.find(({
        id
      }) => item.source_id === id).name
    });
  })), /*#__PURE__*/React.createElement("aside", {
    className: "news__second-column"
  }, articles.items.slice(3, 12).map(item => {
    return /*#__PURE__*/React.createElement(SmallArticle, {
      key: item.title,
      title: item.title,
      source: articles.sources.find(({
        id
      }) => item.source_id === id).name,
      date: item.date
    });
  }))))), /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Navigation, {
    category: category,
    onNavClick: onNavClick,
    className: "footer__navigation"
  }), /*#__PURE__*/React.createElement("div", {
    className: "footer__last-column grid"
  }, /*#__PURE__*/React.createElement("p", {
    className: "footer__about"
  }, "\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 Frontend \u043A\u0443\u0440\u0441\u0435 \u0432 ", /*#__PURE__*/React.createElement("a", {
    className: "footer__link",
    target: "_blank",
    href: "src/scripts/components/App"
  }, "Karpov.Courses")), /*#__PURE__*/React.createElement("span", {
    className: "footer__copyright"
  }, "\xA9 2022")))));
};