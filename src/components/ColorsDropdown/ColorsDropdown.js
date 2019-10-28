import React from "react";
import { array, func, object } from "prop-types";

import "./ColorsDropdown.styles.scss";

import Portal from "../Portal/Portal";
import { useRectSize } from "../../hooks";

const ColorsDropdown = ({ onChangeHandler, position, colors }) => {
  const [dropdownRef, dropdownSize] = useRectSize();

  let style = {
    left: position.left,
    right: position.right,
    top: position.top,
  };

  style.right = Math.min(
    position.right,
    document.body.clientWidth - dropdownSize.width,
  );

  return (
    <Portal id="colors-dropdown-portal">
      <div className="ColorsDropdown__Overlay">
        <ul className="ColorsDropdown__List" ref={dropdownRef} style={style}>
          {colors.map((color) => (
            <li
              className="ColorsDropdown__Item"
              key={color.id}
              onClick={() => onChangeHandler(color)}
              tabIndex="-1"
            >
              <svg
                className="ColorsDropdown__Item__ColorIcon"
                fill={color.colorValue}
              >
                <use xlinkHref="#color" />
              </svg>
              {color.colorName}
            </li>
          ))}
        </ul>
      </div>
    </Portal>
  );
};

ColorsDropdown.propTypes = {
  colors: array.isRequired,
  onChangeHandler: func.isRequired,
  position: object.isRequired,
};

export default ColorsDropdown;
