import React from "react";
import { string, node } from "prop-types";
import classNames from "classnames";

import "./TextButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function TextButton({ icon, additionalClasses, children, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    TextButton: true,
    TextButton__WithIcon: Boolean(icon),
    ...addedClasses,
  });

  const svgClassNames = classNames({
    TextButton__Icon: true,
  });

  return (
    <button className={buttonClassNames} {...props}>
      {icon && (
        <svg className={svgClassNames}>
          <use xlinkHref={`#${icon}`} aria-hidden="true" />
        </svg>
      )}
      {children}
    </button>
  );
}

TextButton.propTypes = {
  icon: string,
  additionalClasses: string,
  children: node.isRequired,
};

TextButton.defaultProps = {
  icon: null,
  additionalClasses: null,
};

export default TextButton;
