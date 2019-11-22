import React from "react";
import classnames from "classnames";
import { node } from "prop-types";

import "./AddTime.styles.scss";

import { getClassesFromProps } from "../../utils/helpers";

function AddTime({ children, additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const addNewClasses = classnames({
    AddTime: true,
    ...addedClasses,
  });

  return (
    <button className={addNewClasses} type="button" {...props}>
      <svg className="AddTime__Icon">
        <use xlinkHref="#add-20" />
      </svg>
      {children}
    </button>
  );
}

AddTime.propTypes = {
  children: node.isRequired,
};

export default AddTime;
