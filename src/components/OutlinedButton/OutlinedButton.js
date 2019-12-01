import React, { forwardRef } from "react";
import { string, node, bool, oneOf } from "prop-types";
import classNames from "classnames";

import "./OutlinedButton.styles.scss";
import AriaText from "../AriaText/AriaText";
import { getClassesFromProps } from "../../utils/helpers";

const OutlinedButton = forwardRef(
  (
    {
      icon,
      ariaText,
      additionalClasses,
      type = "button",
      size = "xl",
      iconOnly = false,
      children,
      ...props
    },
    ref,
  ) => {
    const addedClasses = getClassesFromProps(additionalClasses);

    const buttonClassNames = classNames({
      OutlinedButton: true,
      [`OutlinedButton--IconOnly`]: iconOnly ? true : false,
      [`OutlinedButton--IconOnly--Medium`]: iconOnly && size === "m",
      [`OutlinedButton--IconOnly--Small`]: iconOnly && size === "s",
      [`OutlinedButton--Medium`]: size === "m",
      [`OutlinedButton--Small`]: size === "s",
      ...addedClasses,
    });

    const svgClassNames = classNames({
      OutlinedButton__Icon: true,
      [`OutlinedButton__Icon--Spaced`]: iconOnly ? false : true,
    });

    return (
      <button className={buttonClassNames} type={type} ref={ref} {...props}>
        {ariaText && <AriaText>{ariaText}</AriaText>}

        {iconOnly ? (
          <svg className={svgClassNames}>
            <use xlinkHref={`#${icon}`} aria-hidden="true" />
          </svg>
        ) : (
          <>
            {icon && (
              <svg className={svgClassNames}>
                <use xlinkHref={`#${icon}`} aria-hidden="true" />
              </svg>
            )}
            {children}
          </>
        )}
      </button>
    );
  },
);

OutlinedButton.propTypes = {
  icon: string,
  ariaText: string,
  iconOnly: bool,
  size: oneOf(["xl", "m", "s"]),
  additionalClasses: string,
  children: node,
};

OutlinedButton.defaultProps = {
  icon: null,
  ariaText: null,
  iconOnly: false,
  additionalClasses: null,
  children: null,
};

export default OutlinedButton;
