import React from "react";
import { string, node, oneOf } from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./LinkButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function LinkButton({
  additionalClasses,
  to = "/",
  type = "button",
  size = "xl",
  children,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    LinkButton: true,
    [`LinkButton--Medium`]: size === "m",
    [`LinkButton--Small`]: size === "s",
    ...addedClasses,
  });

  return (
    <Link to={to} className={buttonClassNames} {...props}>
      {children}
    </Link>
  );
}

LinkButton.propTypes = {
  to: string.isRequired,
  additionalClasses: string,
  size: oneOf(["xl", "m", "s"]),
  children: node.isRequired,
};

LinkButton.defaultProps = {
  additionalClasses: null,
};

export default LinkButton;
