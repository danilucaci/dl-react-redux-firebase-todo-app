import React from "react";
import { string, bool } from "prop-types";
import classNames from "classnames";

import "./IconButton.styles.scss";

import AriaText from "../AriaText/AriaText";

function IconButton({
  icon = "",
  ariaText = "",
  buttonClasses = "",
  disabled,
}) {
  const buttonClassNames = classNames(
    Array.from(buttonClasses.split(" ")).reduce(
      (classes, currClass) => ({
        ...classes,
        [currClass]: true,
      }),
      {
        IconButton: true,
      },
    ),
  );

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
  disabled: bool,
  ariaText: string.isRequired,
};

IconButton.defaultProps = {
  icon: "",
  disabled: false,
};

export default IconButton;
