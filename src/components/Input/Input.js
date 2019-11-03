import React, { forwardRef } from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./Input.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

const Input = forwardRef(
  (
    { additionalClasses, label = "", type = "text", name = "input", ...props },
    ref,
  ) => {
    const addedClasses = getClassesFromProps(additionalClasses);

    const inputClasses = classNames({
      Input: true,
      ...addedClasses,
    });

    const labelClasses = classNames({
      Input__Label: true,
    });

    return (
      <>
        {label ? (
          <label htmlFor={name} className={labelClasses}>
            {label}
          </label>
        ) : null}
        <input
          type={type}
          name={name}
          className={inputClasses}
          {...props}
          ref={ref}
        />
      </>
    );
  },
);

Input.propTypes = {
  additionalClasses: string,
  label: string,
  type: string,
  name: string,
};

Input.defaultProps = {
  additionalClasses: null,
  label: "",
  type: "text",
  name: "input",
};

export default Input;
