import { createElement } from "react";
import { icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";
// Performant way to determine if object coerces to a number
function _isNumerical(obj: any) {
  obj = obj - 0;

  // eslint-disable-next-line no-self-compare
  return obj === obj;
}

const camelize = (string: string) => {
  if (_isNumerical(string)) {
    return string;
  }

  // eslint-disable-next-line no-useless-escape
  string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : "";
  });

  // Ensure 1st char is always lowercase
  return string.substr(0, 1).toLowerCase() + string.substr(1);
};

const convertAbstractToElement = (element: any) => {
  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc: any, key) => {
      const val = element.attributes[key];

      switch (key) {
        case "class":
          acc.attrs["className"] = val;
          delete element.attributes["class"];
          break;
        default:
          if (key.indexOf("aria-") === 0 || key.indexOf("data-") === 0) {
            acc.attrs[key.toLowerCase()] = val;
          } else {
            acc.attrs[camelize(key)] = val;
          }
      }

      return acc;
    },
    { attrs: {} }
  );
  const children = (element.children || []).map((child: any) =>
    convertAbstractToElement(child)
  );
  return createElement(element.tag, { ...mixins.attrs }, ...children);
};

export const convertIconToHTML = (def: IconDefinition) => {
  const _icon = icon(def);
  return convertAbstractToElement(_icon.abstract[0]);
};
