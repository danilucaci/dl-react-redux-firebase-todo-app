import React from "react";
import { connect } from "react-redux";
import { array, func, object } from "prop-types";

import "./ColorsDropdown.styles.scss";

import Portal from "../Portal/Portal";
import { colorsSelector } from "../../redux/colors/colors-selectors";
import { useRectSize } from "../../hooks";

const ColorsDropdown = ({ onChangeHandler, position, colors }) => {
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

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
});

export default connect(mapStateToProps)(ColorsDropdown);
