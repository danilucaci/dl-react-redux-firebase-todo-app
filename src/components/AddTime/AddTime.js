import React, { forwardRef } from "react";
import classnames from "classnames";
import { node } from "prop-types";

import "./AddTime.styles.scss";

import { getClassesFromProps } from "../../utils/helpers";

const AddTime = forwardRef(({ children, additionalClasses, ...props }, ref) => {
  const addedClasses = getClassesFromProps(additionalClasses);

  const addNewClasses = classnames({
    AddTime: true,
    ...addedClasses,
  });

  return (
    <button className={addNewClasses} type="button" ref={ref} {...props}>
      <svg className="AddTime__Icon">
        <use xlinkHref="#add-20" />
      </svg>
      {children}
    </button>
  );
});

AddTime.propTypes = {
  children: node.isRequired,
};

export default AddTime;
