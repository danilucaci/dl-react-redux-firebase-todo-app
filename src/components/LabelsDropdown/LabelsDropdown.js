import React from "react";
import { connect } from "react-redux";
import { array, bool, object, func } from "prop-types";

import "./LabelsDropdown.styles.scss";
import Portal from "../Portal/Portal";
import { labelsSelector } from "../../redux/labels/labels-selectors";
import { useRectSize } from "../../hooks";
import TextButton from "../TextButton/TextButton";

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

const LabelsDropdown = ({
  appLabels,
  labels,
  onChangeHandler,
  onCloseHandler,
  bottomFixed,
  position,
}) => {
  const [dropdownRef, dropdownSize] = useRectSize();

  let style = {
    left: position.left,
    right: position.right,
    top: position.top,
  };

  style.left = Math.min(
    position.left,
    document.body.clientWidth - dropdownSize.width - 16,
  );

  style.right = Math.min(
    position.right,
    document.body.clientWidth - dropdownSize.width - 16,
  );

  if (
    bottomFixed &&
    position.top + dropdownSize.height > document.body.clientHeight
  ) {
    style.top =
      position.top -
      8 -
      (position.top + dropdownSize.height - document.body.clientHeight);
  }

  function handleLabelSelect(currLabel) {
    const newLabels = getNewlabels(labels)(currLabel);
    onChangeHandler(newLabels);
  }

  return appLabels ? (
    <Portal id="labels-dropdown-portal">
      <div className="LabelsDropdown__Overlay">
        <div
          className="LabelsDropdown__Wrapper"
          ref={dropdownRef}
          style={style}
        >
          <ul className="LabelsDropdown__List">
            {appLabels.map((appLabel) => (
              <li
                className={`LabelsDropdown__Item ${
                  existsIn(labels)(appLabel.id)
                    ? `LabelsDropdown__Item--Selected`
                    : null
                }`}
                key={appLabel.id}
                onClick={() => handleLabelSelect(appLabel)}
              >
                <svg
                  className="LabelsDropdown__Item__ColorIcon"
                  fill={appLabel.color.colorValue}
                >
                  <use xlinkHref="#tag" />
                </svg>
                <span className="LabelsDropdown__Item__Name">
                  {appLabel.name}
                </span>
                {existsIn(labels)(appLabel.id) && (
                  <svg className="LabelsDropdown__Item__Check">
                    <use xlinkHref="#check-24" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
          <div className="LabelsDropdown__ButtonsRow">
            <TextButton
              additionalClasses="TextButton--Small"
              onClick={onCloseHandler}
              type="button"
            >
              Close
            </TextButton>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

LabelsDropdown.propTypes = {
  labels: array,
  appLabels: array.isRequired,
  onChangeHandler: func.isRequired,
  onCloseHandler: func.isRequired,
  bottomFixed: bool,
  position: object.isRequired,
};

LabelsDropdown.defaultProps = {
  bottomFixed: false,
  labels: null,
};

export const mapStateToProps = (state) => ({
  appLabels: labelsSelector(state),
});

export default connect(mapStateToProps)(LabelsDropdown);
