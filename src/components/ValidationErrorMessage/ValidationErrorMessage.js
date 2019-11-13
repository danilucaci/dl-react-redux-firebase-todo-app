import React from "react";
import { string, node } from "prop-types";
import classNames from "classnames";

import "./ValidationErrorMessage.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function ValidationErrorMessage({ additionalClasses, children, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const messageClassNames = classNames({
    ValidationErrorMessage: true,
    ...addedClasses,
  });

  return (
    <p className={messageClassNames} {...props}>
      {children}
    </p>
  );
}

ValidationErrorMessage.propTypes = {
  additionalClasses: string,
  children: node.isRequired,
};

ValidationErrorMessage.defaultProps = {
  additionalClasses: null,
};

export default ValidationErrorMessage;
