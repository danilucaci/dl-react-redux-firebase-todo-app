import React from "react";
import { string, bool, node } from "prop-types";
import classNames from "classnames";

import "./PrimaryButton.styles.scss";

function PrimaryButton({ icon = "", disabled, children }) {
  const buttonClassNames = classNames({
    PrimaryButton: true,
    PrimaryButton__WithIcon: !!icon,
  });

  const svgClassNames = classNames({
    PrimaryButton__Icon: true,
  });

  return (
    <button className={buttonClassNames} disabled={disabled}>
      {icon && (
        <svg className={svgClassNames}>
          <use xlinkHref={`#${icon}`} aria-hidden="true" />
        </svg>
      )}
      {children}
    </button>
  );
}

PrimaryButton.propTypes = {
  icon: string,
  disabled: bool,
  children: node.isRequired,
};

PrimaryButton.defaultProps = {
  icon: "",
  disabled: false,
};

export default PrimaryButton;
