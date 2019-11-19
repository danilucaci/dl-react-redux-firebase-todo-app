import React from "react";
import { string, node, oneOf } from "prop-types";
import classNames from "classnames";

import "./TextButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import AriaText from "../AriaText/AriaText";

function TextButton({
  additionalClasses,
  size = "xl",
  ariaText,
  children,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    TextButton: true,
    [`TextButton--Medium`]: size === "m",
    [`TextButton--Small`]: size === "s",
    ...addedClasses,
  });

  return (
    <button className={buttonClassNames} {...props}>
      {ariaText && <AriaText>{ariaText}</AriaText>}
      {children}
    </button>
  );
}

TextButton.propTypes = {
  size: oneOf(["xl", "m", "s"]),
  additionalClasses: string,
  ariaText: string,
  children: node.isRequired,
};

TextButton.defaultProps = {
  size: "xl",
  ariaText: null,
  additionalClasses: null,
};

export default TextButton;
