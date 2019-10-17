import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./IconButton.styles.scss";

import AriaText from "../AriaText/AriaText";
import { getClassesFromProps } from "../../utils/helpers";

function IconButton({ icon, ariaText, additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    IconButton: true,
    ...addedClasses,
  });

  const svgClassNames = classNames({
    IconButton__Icon: true,
  });

  return (
    <button className={buttonClassNames} {...props}>
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
  ariaText: string.isRequired,
};

IconButton.defaultProps = {
  icon: null,
  additionalClasses: null,
};

export default IconButton;
