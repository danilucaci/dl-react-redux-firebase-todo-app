import React, { forwardRef } from "react";
import classNames from "classnames";

import "./Input.styles.scss";

const Input = forwardRef(({ children, type = "text", ...props }, ref) => {
  const inputClasses = classNames({
    Input: true,
  });

  const labelClasses = classNames({
    Input__Label: true,
  });

  return (
    <label htmlFor="input" className={labelClasses}>
      <input type={type} className={inputClasses} {...props} ref={ref} />
    </label>
  );
});

export default Input;
