import React from "react";
import { array, func, object, bool } from "prop-types";
import ReactModal from "react-modal";

import "./ColorsDropdown.styles.scss";
import { useRectSize } from "../../hooks";

ReactModal.setAppElement("#root");

const ColorsDropdown = ({
  onChangeHandler,
  isVisible,
  toggleVisibility,
  position,
  colors,
}) => {
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
    <ReactModal
      isOpen={isVisible}
      contentLabel="Add a new label"
      onRequestClose={toggleVisibility}
      contentRef={(ref) => (dropdownRef.current = ref)}
      className="ColorsDropdown__Wrapper"
      overlayClassName="ColorsDropdown__Overlay"
      style={{
        content: {
          ...style,
        },
      }}
    >
      <ul className="ColorsDropdown__List">
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
    </ReactModal>
  );
};

ColorsDropdown.propTypes = {
  colors: array.isRequired,
  onChangeHandler: func.isRequired,
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  position: object.isRequired,
};

export default ColorsDropdown;
