import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./TodoLabelTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function TodoLabelTag({
  labelName,
  labelColorValue,
  additionalClasses,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    Todo__Label__Tag: true,
    ...addedClasses,
  });

  return (
    <button className={buttonClassNames} type="button" {...props}>
      <svg className="Todo__Label__Tag__Icon" fill={labelColorValue}>
        <use xlinkHref="#tag" />
      </svg>
      {labelName}
    </button>
  );
}

TodoLabelTag.propTypes = {
  labelName: string.isRequired,
  labelColorValue: string,
  additionalClasses: string,
};

TodoLabelTag.defaultProps = {
  labelColorValue: null,
  additionalClasses: null,
};

export default TodoLabelTag;
