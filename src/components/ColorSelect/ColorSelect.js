import React from "react";
import { bool, func, object } from "prop-types";

import "./ColorSelect.styles.scss";

import { useRectSize } from "../../hooks";
import ColorsDropdownContainer from "../../redux/containers/components/ColorsDropdownContainer";

const ColorSelect = ({
  selectedColor,
  onChangeHandler,
  isVisible,
  toggleVisibility,
}) => {
  const [colorSelectRef, colorSelectSize] = useRectSize();

  return (
    <>
      <button
        className="ColorSelect__Button"
        type="button"
        ref={colorSelectRef}
        onClick={toggleVisibility}
      >
        <svg
          className="ColorSelect__Color__Icon"
          fill={selectedColor.colorValue}
        >
          <use xlinkHref="#color" />
        </svg>
        <span className="ColorSelect__Label">{selectedColor.colorName}</span>
        <svg className="ColorSelect__Chevron">
          <use xlinkHref="#select" />
        </svg>
      </button>
      {isVisible && (
        <ColorsDropdownContainer
          onChangeHandler={onChangeHandler}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
          position={{
            left: colorSelectSize.left || 0,
            right: colorSelectSize.right || 0,
            top: colorSelectSize.top + colorSelectSize.height || 0,
          }}
        />
      )}
    </>
  );
};

ColorSelect.propTypes = {
  selectedColor: object.isRequired,
  onChangeHandler: func.isRequired,
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
};

export default ColorSelect;
