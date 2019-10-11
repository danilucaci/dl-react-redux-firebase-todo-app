import React from "react";
import { arrayOf, string, bool } from "prop-types";
import classNames from "classnames";

import "./IconButton.styles.scss";

import AriaText from "../AriaText/AriaText";

function IconButton({ icon, ariaText, additionalClasses, disabled }) {
  const addedClasses = additionalClasses.reduce(
    (classes, currClass) => ({
      ...classes,
      [currClass]: true,
    }),
    {},
  );

  const buttonClassNames = classNames({
    IconButton: true,
    ...addedClasses,
  });

  const svgClassNames = classNames({
    IconButton__Icon: true,
  });

  return (
    <button className={buttonClassNames} disabled={disabled}>
      <AriaText>{ariaText}</AriaText>
      <svg className={svgClassNames}>
        <use xlinkHref={`#${icon}`} aria-hidden="true" />
      </svg>
    </button>
  );
}

IconButton.propTypes = {
  icon: string,
  additionalClasses: arrayOf(string),
  disabled: bool,
  ariaText: string.isRequired,
};

IconButton.defaultProps = {
  icon: "",
  additionalClasses: null,
  disabled: false,
};

export default IconButton;
