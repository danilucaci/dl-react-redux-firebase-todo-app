import React from "react";
import { string, node } from "prop-types";
import classNames from "classnames";

import "./OutlinedButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function OutlinedButton({
  additionalClasses,
  type = "button",
  children,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    OutlinedButton: true,
    ...addedClasses,
  });

  return (
    <button className={buttonClassNames} type={type} {...props}>
      {children}
    </button>
  );
}

OutlinedButton.propTypes = {
  additionalClasses: string,
  children: node.isRequired,
};

OutlinedButton.defaultProps = {
  additionalClasses: null,
};

export default OutlinedButton;
