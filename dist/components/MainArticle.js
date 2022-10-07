import React from 'react';
export const MainArticle = ({
  image,
  category,
  title,
  description,
  source
}) => {
  return /*#__PURE__*/React.createElement("article", {
    className: "news-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "news-item__image-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "news-item__image",
    src: image,
    alt: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430"
  })), /*#__PURE__*/React.createElement("div", {
    className: "news-item__about"
  }, /*#__PURE__*/React.createElement("span", {
    className: "news-item__category"
  }, category), /*#__PURE__*/React.createElement("h2", {
    className: "news-item__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "news-item__description"
  }, description), /*#__PURE__*/React.createElement("span", {
    className: "news-item__source"
  }, source)));
};