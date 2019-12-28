import React from "react";
import { string } from "prop-types";
import { Field } from "formik";
import classnames from "classnames";

import { getClassesFromProps } from "../../utils/helpers";
import "./Checkbox.styles.scss";

export function CheckboxLabel({ idLabel, additionalClasses, children }) {
  const labelClassnames = classnames({
    Checkbox__Label: true,
    ...getClassesFromProps(additionalClasses),
  });

  return (
    <label htmlFor={idLabel} className={labelClassnames}>
      {children}
    </label>
  );
}

function Checkbox({ idLabel = "checkbox", additionalClasses, ...props }) {
  const checkboxClassnames = classnames({
    Checkbox: true,
    ...getClassesFromProps(additionalClasses),
  });

  return (
    <Field
      id={idLabel}
      type="checkbox"
      className={checkboxClassnames}
      {...props}
    />
  );
}

Checkbox.propTypes = {
  idLabel: string.isRequired,
  additionalClasses: string,
};

Checkbox.defaultProps = {
  additionalClasses: null,
};

CheckboxLabel.propTypes = {
  idLabel: string.isRequired,
  additionalClasses: string,
};

CheckboxLabel.defaultProps = {
  additionalClasses: null,
};

export default Checkbox;
