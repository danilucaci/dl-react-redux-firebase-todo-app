import React from "react";
import { func, object, array } from "prop-types";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import "./ColorSelect.styles.scss";

const ColorSelect = ({
  selectedColor,
  onChangeHandler,
  toggleVisibility,
  colors,
}) => {
  return (
    <Menu>
      <MenuButton
        className="ColorSelect__Button"
        type="button"
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
        <MenuList className="ColorSelect__List">
          {colors &&
            colors.map((color) => (
              <MenuItem
                className="ColorSelect__Item"
                key={color.id}
                onSelect={() => onChangeHandler(color)}
              >
                <svg
                  className="ColorSelect__Item__ColorIcon"
                  fill={color.colorValue}
                >
                  <use xlinkHref="#color" />
                </svg>
                {color.colorName}
              </MenuItem>
            ))}
        </MenuList>
      </MenuButton>
    </Menu>
  );
};

ColorSelect.propTypes = {
  selectedColor: object.isRequired,
  onChangeHandler: func.isRequired,
  toggleVisibility: func.isRequired,
  colors: array.isRequired,
};

export default ColorSelect;
