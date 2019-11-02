import React from "react";
import { string, array, bool, func } from "prop-types";
import classNames from "classnames";

import "./TodoLabelTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { useRectSize } from "../../hooks";
import LabelsDropdownContainer from "../../redux/containers/components/LabelsDropdownContainer";

export const LabelTag = ({
  labelName,
  labelColorValue,
  additionalClasses,
  isVisible,
  toggleVisibility,
  bottomFixed,
  onChangeHandler,
  labels,
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
        <LabelsDropdownContainer
          onChangeHandler={onChangeHandler}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
          bottomFixed={bottomFixed}
          labels={labels}
          position={{
            left: labelsTagSize.left || 0,
            right: labelsTagSize.right || 0,
            top: labelsTagSize.top + labelsTagSize.height + 8 || 0,
          }}
        />
      )}
      <button
        className={buttonClassNames}
        type="button"
        ref={labelsTagRef}
        onClick={toggleVisibility}
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
  isVisible,
  toggleVisibility,
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
        toggleVisibility={toggleVisibility}
        onChangeHandler={onChangeHandler}
        labels={labels}
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
        toggleVisibility={toggleVisibility}
        onChangeHandler={onChangeHandler}
        labels={labels}
        {...props}
      />
    );
  } else if (Array.isArray(labels) && labels.length > 1) {
    let labelName;

    if (labels.length === 2) {
      labelName = `${labels[0].name}, ${labels[1].name}`;
    }
    if (labels.length > 2) {
      labelName = `${labels[0].name} and ${labels.length - 1} more labels`;
    }

    return (
      <LabelTag
        labelName={labelName}
        labelColorValue={labels[0].colorValue}
        additionalClasses={additionalClasses}
        isVisible={isVisible}
        toggleVisibility={toggleVisibility}
        onChangeHandler={onChangeHandler}
        labels={labels}
        {...props}
      />
    );
  } else {
    return null;
  }
};

LabelTag.propTypes = {
  labelName: string.isRequired,
  labelColorValue: string.isRequired,
  additionalClasses: string,
  isVisible: bool.isRequired,
  toggleVisibility: func,
  onChangeHandler: func,
  labels: array,
  bottomFixed: bool,
};

LabelTag.defaultProps = {
  labels: null,
  additionalClasses: null,
  isVisible: false,
  toggleVisibility: null,
  onChangeHandler: null,
  bottomFixed: false,
};

TodoLabelTag.propTypes = {
  labels: array,
  additionalClasses: string,
  isVisible: bool,
  toggleVisibility: func,
  onChangeHandler: func,
  bottomFixed: bool,
};

TodoLabelTag.defaultProps = {
  labels: null,
  additionalClasses: null,
  isVisible: false,
  toggleVisibility: null,
  onChangeHandler: null,
  bottomFixed: false,
};

export default TodoLabelTag;
