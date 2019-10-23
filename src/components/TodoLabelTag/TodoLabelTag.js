import React from "react";
import { string, array, bool, func } from "prop-types";
import classNames from "classnames";

import "./TodoLabelTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { useRectSize } from "../../hooks";
import LabelsDropdown from "../LabelsDropdown/LabelsDropdown";

export const LabelTag = ({
  labelName,
  labelColorValue,
  additionalClasses,
  isVisible,
  onChangeHandler,
  ...props
}) => {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    Todo__Label__Tag: true,
    ...addedClasses,
  });

  const [labelsTagRef, labelsTagSize] = useRectSize();

  return (
    <>
      {isVisible && (
        <LabelsDropdown
          onChangeHandler={onChangeHandler}
          position={{
            left: labelsTagSize.left + window.scrollX || 0,
            right: labelsTagSize.right + window.scrollX || 0,
            top: labelsTagSize.top + window.scrollY + labelsTagSize.height || 0,
          }}
        />
      )}
      <button
        className={buttonClassNames}
        type="button"
        ref={labelsTagRef}
        {...props}
      >
        <svg className="Todo__Label__Tag__Icon" fill={labelColorValue}>
          <use xlinkHref="#tag" />
        </svg>
        {labelName}
      </button>
    </>
  );
};

const TodoLabelTag = ({
  labels,
  additionalClasses,
  condensed,
  isVisible,
  onChangeHandler,
  ...props
}) => {
  if (!Boolean(labels) || !Array.isArray(labels) || labels.length === 0) {
    return (
      <LabelTag
        labelName="Add Label"
        labelColorValue="#81878f"
        additionalClasses={additionalClasses}
        isVisible={isVisible}
        onChangeHandler={onChangeHandler}
        {...props}
      />
    );
  } else if (Array.isArray(labels) && labels.length === 1) {
    return (
      <LabelTag
        labelName={labels[0].name}
        labelColorValue={labels[0].colorValue}
        additionalClasses={additionalClasses}
        isVisible={isVisible}
        onChangeHandler={onChangeHandler}
        {...props}
      />
    );
  } else if (Array.isArray(labels) && labels.length > 1) {
    return condensed ? (
      <LabelTag
        labelName={`${labels.length} labels`}
        labelColorValue="#81878f"
        additionalClasses={additionalClasses}
        isVisible={isVisible}
        onChangeHandler={onChangeHandler}
        {...props}
      />
    ) : (
      labels.map((label) => (
        <TodoLabelTag
          key={label.labelID}
          labelName={label.name}
          labelColorValue={label.colorValue}
          isVisible={isVisible}
          onChangeHandler={onChangeHandler}
          {...props}
        />
      ))
    );
  } else {
    return null;
  }
};

LabelTag.propTypes = {
  labelName: string.isRequired,
  labelColorValue: string,
  additionalClasses: string,
  isVisible: bool,
  onChangeHandler: func,
};

LabelTag.defaultProps = {
  labels: null,
  additionalClasses: null,
  isVisible: false,
  onChangeHandler: null,
};

TodoLabelTag.propTypes = {
  labels: array,
  condensed: bool,
  additionalClasses: string,
  isVisible: bool,
  onChangeHandler: func,
};

TodoLabelTag.defaultProps = {
  labels: null,
  condensed: false,
  additionalClasses: null,
  isVisible: false,
  onChangeHandler: null,
};

export default TodoLabelTag;
