import { categories } from "../utils.js";
import React from 'react';
export const Navigation = ({
  category,
  onNavClick,
  className = ''
}) => {
  return /*#__PURE__*/React.createElement("nav", {
    className: `navigation grid ${className}`
  }, /*#__PURE__*/React.createElement("a", {
    onClick: onNavClick,
    "data-href": "index",
    className: "navigation__logo"
  }, /*#__PURE__*/React.createElement("img", {
    className: "navigation__image",
    src: "../../src/images/logo.svg",
    alt: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "navigation__list"
  }, categories.map(item => {
    return /*#__PURE__*/React.createElement("li", {
      key: item.value,
      className: "navigation__item"
    }, /*#__PURE__*/React.createElement("a", {
      onClick: onNavClick,
      "data-href": item.value,
      className: `navigation__link ${category === item.value ? 'navigation__link--active' : ''}`
    }, item.title));
  })));
};