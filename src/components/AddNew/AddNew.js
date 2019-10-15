import React from "react";
import classnames from "classnames";
import { node } from "prop-types";

import "./AddNew.styles.scss";

function AddNew(props) {
  const { children } = props;

  const addNewClasses = classnames({
    AddNew: true,
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
