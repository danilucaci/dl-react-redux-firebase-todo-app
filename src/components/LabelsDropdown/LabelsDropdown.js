import React from "react";
import { array, bool, object, func } from "prop-types";
import ReactModal from "react-modal";

import "./LabelsDropdown.styles.scss";
import { useRectSize } from "../../hooks";
import TextButton from "../TextButton/TextButton";

ReactModal.setAppElement("#root");

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
  isVisible,
  toggleVisibility,
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

  if (bottomFixed && position.top + dropdownSize.height > window.innerHeight) {
    style.top =
      position.top -
      8 -
      (position.top + dropdownSize.height - window.innerHeight);
  }

  function handleLabelSelect(currLabel) {
    return onChangeHandler(getNewlabels(labels)(currLabel));
  }

  return appLabels ? (
    <ReactModal
      isOpen={isVisible}
      contentLabel="Add a new label"
      onRequestClose={toggleVisibility}
      contentRef={(ref) => (dropdownRef.current = ref)}
      className="LabelsDropdown__Wrapper"
      overlayClassName="LabelsDropdown__Overlay"
      style={{
        content: {
          ...style,
        },
      }}
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
            <span className="LabelsDropdown__Item__Name">{appLabel.name}</span>
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
          onClick={toggleVisibility}
          type="button"
        >
          Close
        </TextButton>
      </div>
    </ReactModal>
  ) : null;
};

LabelsDropdown.propTypes = {
  labels: array,
  appLabels: array.isRequired,
  onChangeHandler: func.isRequired,
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  bottomFixed: bool,
  position: object.isRequired,
};

LabelsDropdown.defaultProps = {
  bottomFixed: false,
  labels: null,
};

export default LabelsDropdown;
