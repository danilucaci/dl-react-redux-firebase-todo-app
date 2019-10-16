import React from "react";
import classnames from "classnames";
import { node } from "prop-types";

import "./AddNew.styles.scss";

import { getClassesFromProps } from "../../utils/helpers";

function AddNew(props) {
  const { children, additionalClasses } = props;

  const addedClasses = getClassesFromProps(additionalClasses);

  const addNewClasses = classnames({
    AddNew: true,
    ...addedClasses,
  });

  return (
    <button className={addNewClasses}>
      <svg className="AddNew__Icon">
        <use xlinkHref="#add-24" />
      </svg>
      {children}
    </button>
  );
}

AddNew.propTypes = {
  children: node.isRequired,
};

export default AddNew;
