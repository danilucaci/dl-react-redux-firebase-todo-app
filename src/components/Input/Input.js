import React, { forwardRef } from "react";
import classNames from "classnames";

import "./Input.styles.scss";

const Input = forwardRef(({ children, ...props }, ref) => {
  const inputClasses = classNames({
    Input: true,
  });

  const labelClasses = classNames({
    Input__Label: true,
  });

  return (
    <label htmlFor="input" className={labelClasses}>
      <input type="text" className={inputClasses} {...props} ref={ref} />
    </label>
  );
});

export default Input;
