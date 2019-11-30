import React, { memo } from "react";
import { string, array, func } from "prop-types";
import classNames from "classnames";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import "./TodoLabelTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function areEqual(a, b) {
  return a === b;
}

function existsIn(arr) {
  return function item(id) {
    if (Array.isArray(arr)) {
      return arr.some((el) => areEqual(el.labelID, id));
    }
    return false;
  };
}

function filterOut(arr) {
  return function item(id) {
    return arr.filter((el) => !areEqual(el.labelID, id));
  };
}

function addIn(prevLabels) {
  return function newLabel(newLabel) {
    if (Array.isArray(prevLabels)) {
      return [
        ...prevLabels,
        {
          labelID: newLabel.id,
          name: newLabel.name,
          colorName: newLabel.color.colorName,
          colorValue: newLabel.color.colorValue,
        },
      ];
    }
    return [
      {
        labelID: newLabel.id,
        name: newLabel.name,
        colorName: newLabel.color.colorName,
        colorValue: newLabel.color.colorValue,
      },
    ];
  };
}

function getNewlabels(prevLabels) {
  return function compare(selectedLabel) {
    if (existsIn(prevLabels)(selectedLabel.id)) {
      return filterOut(prevLabels)(selectedLabel.id);
    }
    return addIn(prevLabels)(selectedLabel);
  };
}

export const LabelTag = memo(function LabelTag({
  labelName,
  labelColorValue,
  additionalClasses,
  toggleVisibility,
  onChangeHandler,
  labels,
  appLabels,
  dispatch,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    Todo__Label__Tag: true,
    ...addedClasses,
  });

  function handleLabelSelect(currLabel) {
    return onChangeHandler(getNewlabels(labels)(currLabel));
  }

  return (
    <Menu>
      <MenuButton
        className={buttonClassNames}
        type="button"
        onClick={toggleVisibility}
        aria-label="Change the labels of the todo"
        {...props}
      >
        <svg className="Todo__Label__Tag__Icon" fill={labelColorValue}>
          <use xlinkHref="#tag" />
        </svg>
        {labelName}
      </MenuButton>
      <MenuList className="Todo__Label__Tag__List">
        {appLabels.map((appLabel) => (
          <MenuItem
            className={`Todo__Label__Tag__Item ${
              existsIn(labels)(appLabel.id)
                ? `Todo__Label__Tag__Item--Selected`
                : null
            }`}
            key={appLabel.id}
            onSelect={() => handleLabelSelect(appLabel)}
          >
            <svg
              className="Todo__Label__Tag__Item__ColorIcon"
              fill={appLabel.color.colorValue}
            >
              <use xlinkHref="#tag" />
            </svg>
            <span className="Todo__Label__Tag__Item__Name">
              {appLabel.name}
            </span>
            {existsIn(labels)(appLabel.id) && (
              <svg className="Todo__Label__Tag__Item__Check">
                <use xlinkHref="#check-24" />
              </svg>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
});

const TodoLabelTag = ({
  labels,
  additionalClasses,
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
  toggleVisibility: func,
  onChangeHandler: func,
  labels: array,
  appLabels: array,
};

LabelTag.defaultProps = {
  labels: null,
  appLabels: null,
  additionalClasses: null,
  toggleVisibility: null,
  onChangeHandler: null,
};

TodoLabelTag.propTypes = {
  labels: array,
  appLabels: array,
  additionalClasses: string,
  toggleVisibility: func,
  onChangeHandler: func,
};

TodoLabelTag.defaultProps = {
  labels: null,
  appLabels: null,
  additionalClasses: null,
  toggleVisibility: null,
  onChangeHandler: null,
};

export default memo(TodoLabelTag);
