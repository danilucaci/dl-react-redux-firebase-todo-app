import React from "react";
import { string, bool } from "prop-types";
import classNames from "classnames";

import "./IconButton.styles.scss";

import AriaText from "../AriaText/AriaText";
import { getClassesFromProps } from "../../utils/helpers";

function IconButton({ icon, ariaText, additionalClasses, disabled, onClick }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    IconButton: true,
    ...addedClasses,
  });

  const svgClassNames = classNames({
    IconButton__Icon: true,
  });

  return (
    <button className={buttonClassNames} disabled={disabled} onClick={onClick}>
      <AriaText>{ariaText}</AriaText>
      <svg className={svgClassNames}>
        <use xlinkHref={`#${icon}`} aria-hidden="true" />
      </svg>
    </button>
  );
}

IconButton.propTypes = {
  icon: string,
  additionalClasses: string,
  disabled: bool,
  ariaText: string.isRequired,
};

IconButton.defaultProps = {
  icon: "",
  additionalClasses: "",
  disabled: false,
};

export default IconButton;
