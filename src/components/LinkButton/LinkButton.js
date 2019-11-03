import React from "react";
import { string, node } from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./LinkButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function LinkButton({ additionalClasses, to = "/", children, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    LinkButton: true,
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
  children: node.isRequired,
};

LinkButton.defaultProps = {
  additionalClasses: null,
};

export default LinkButton;
