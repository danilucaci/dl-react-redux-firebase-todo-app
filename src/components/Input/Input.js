import React, { forwardRef } from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./Input.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

const Input = forwardRef(
  (
    {
      additionalClasses,
      labelAdditionalClasses,
      label = "",
      type = "text",
      name = "input",
      ...props
    },
    ref,
  ) => {
    const addedClasses = getClassesFromProps(additionalClasses);
    const labelAddedClasses = getClassesFromProps(labelAdditionalClasses);

    const inputClasses = classNames({
      Input: true,
      ...addedClasses,
    });

    const labelClasses = classNames({
      Input__Label: true,
      ...labelAddedClasses,
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
  labelAdditionalClasses: string,
  label: string,
  type: string,
  name: string,
};

Input.defaultProps = {
  additionalClasses: null,
  labelAdditionalClasses: null,
  label: "",
  type: "text",
  name: "input",
};

export default Input;
