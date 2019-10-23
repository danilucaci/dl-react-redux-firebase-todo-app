import React, { forwardRef } from "react";
import { string, array, bool } from "prop-types";
import classNames from "classnames";

import "./TodoLabelTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

export const LabelTag = forwardRef(
  ({ labelName, labelColorValue, additionalClasses, ...props }, ref) => {
    const addedClasses = getClassesFromProps(additionalClasses);

    const buttonClassNames = classNames({
      Todo__Label__Tag: true,
      ...addedClasses,
    });

    return (
      <button className={buttonClassNames} type="button" ref={ref} {...props}>
        <svg className="Todo__Label__Tag__Icon" fill={labelColorValue}>
          <use xlinkHref="#tag" />
        </svg>
        {labelName}
      </button>
    );
  },
);

const TodoLabelTag = forwardRef(
  ({ labels, additionalClasses, condensed, ...props }, ref) => {
    if (!Boolean(labels) || !Array.isArray(labels) || labels.length === 0) {
      return (
        <LabelTag
          labelName="Add Label"
          labelColorValue="#81878f"
          additionalClasses={additionalClasses}
          ref={ref}
          {...props}
        />
      );
    } else if (Array.isArray(labels) && labels.length === 1) {
      return (
        <LabelTag
          labelName={labels[0].name}
          labelColorValue={labels[0].colorValue}
          additionalClasses={additionalClasses}
          ref={ref}
          {...props}
        />
      );
    } else if (Array.isArray(labels) && labels.length > 1) {
      return condensed ? (
        <LabelTag
          labelName={`${labels.length} labels`}
          labelColorValue="#81878f"
          additionalClasses={additionalClasses}
          ref={ref}
          {...props}
        />
      ) : (
        labels.map((label) => (
          <TodoLabelTag
            key={label.labelID}
            labelName={label.name}
            labelColorValue={label.colorValue}
            {...props}
          />
        ))
      );
    } else {
      return null;
    }
  },
);

LabelTag.propTypes = {
  labelName: string.isRequired,
  labelColorValue: string,
  additionalClasses: string,
};

LabelTag.defaultProps = {
  labels: null,
  additionalClasses: null,
};

TodoLabelTag.propTypes = {
  labels: array,
  condensed: bool,
  additionalClasses: string,
};

TodoLabelTag.defaultProps = {
  labels: null,
  condensed: false,
  additionalClasses: null,
};

export default TodoLabelTag;
