import React from "react";
import { string, node, bool, oneOf } from "prop-types";
import classNames from "classnames";

import "./PrimaryButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import AriaText from "../AriaText/AriaText";
import Spinner from "../Spinner/Spinner";

function PrimaryButton({
  icon,
  ariaText,
  additionalClasses,
  size = "xl",
  iconOnly = false,
  children,
  loading = false,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    PrimaryButton: true,
    [`PrimaryButton--Medium`]: !Boolean(icon) && size === "m",
    [`PrimaryButton--Small`]: !Boolean(icon) && size === "s",
    [`PrimaryButton--WithIcon`]: !iconOnly && Boolean(icon),
    [`PrimaryButton--WithIcon--Medium`]:
      !iconOnly && Boolean(icon) && size === "m",
    [`PrimaryButton--WithIcon--Small`]:
      !iconOnly && Boolean(icon) && size === "s",
    [`PrimaryButton--IconOnly`]: iconOnly ? true : false,
    [`PrimaryButton--IconOnly--Medium`]: iconOnly && size === "m",
    [`PrimaryButton--IconOnly--Small`]: iconOnly && size === "s",
    ...addedClasses,
  });

  const svgClassNames = classNames({
    PrimaryButton__Icon: true,
    [`PrimaryButton__Icon--Spaced`]: iconOnly ? false : true,
  });

  return (
    <button className={buttonClassNames} {...props}>
      {ariaText && <AriaText>{ariaText}</AriaText>}
      {iconOnly && !loading && (
        <svg className={svgClassNames}>
          <use xlinkHref={`#${icon}`} />
        </svg>
      )}

      {!iconOnly && !loading && (
        <>
          {icon && (
            <svg className={svgClassNames}>
              <use xlinkHref={`#${icon}`} />
            </svg>
          )}
          {children}
        </>
      )}
      {loading && <Spinner />}
    </button>
  );
}

PrimaryButton.propTypes = {
  icon: string,
  ariaText: string,
  iconOnly: bool,
  size: oneOf(["xl", "m", "s"]),
  additionalClasses: string,
  children: node,
  loading: bool,
};

PrimaryButton.defaultProps = {
  icon: null,
  ariaText: null,
  iconOnly: false,
  additionalClasses: null,
  children: null,
  loading: false,
};

export default PrimaryButton;
