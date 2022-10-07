import React from 'react';
export const SmallArticle = ({
  title,
  date,
  source
}) => {
  return /*#__PURE__*/React.createElement("article", {
    className: "aside-item"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "aside-item__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "aside-item__wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: "aside-item__date"
  }, new Date(date).toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric'
  })), /*#__PURE__*/React.createElement("span", {
    className: "aside-item__source"
  }, source)));
};