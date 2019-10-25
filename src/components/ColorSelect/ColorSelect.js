import React from "react";
import { bool, func, object } from "prop-types";

import "./ColorSelect.styles.scss";

import { useRectSize } from "../../hooks";
import ColorsDropdown from "../ColorsDropdown/ColorsDropdown";

const ColorSelect = ({
  selectedColor,
  onChangeHandler,
  isVisible,
  toggleIsVisible,
}) => {
  const [colorSelectRef, colorSelectSize] = useRectSize();

  return (
    <>
      <button
        className="ColorSelect__Button"
        type="button"
        ref={colorSelectRef}
        onClick={toggleIsVisible}
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
        <ColorsDropdown
          onChangeHandler={onChangeHandler}
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
};

export default ColorSelect;
