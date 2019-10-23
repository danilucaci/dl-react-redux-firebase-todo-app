import React from "react";
import { connect } from "react-redux";
import { array } from "prop-types";

import "./LabelsDropdown.styles.scss";
import Portal from "../Portal/Portal";
import { labelsSelector } from "../../redux/labels/labels-selectors";
import { useRectSize } from "../../hooks";

const LabelsDropdown = ({ labels, onChangeHandler, position }) => {
  // const listRef = useRef(null);

  // useEffect(() => {
  //   if (listRef.current) {
  //     console.log(listRef.current);
  //   }
  // });

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

  return labels ? (
    <Portal id="labels-dropdown-portal">
      <div className="LabelsDropdown__Overlay">
        <ul className="LabelsDropdown__List" ref={dropdownRef} style={style}>
          {labels.map((label) => (
            <li
              className="LabelsDropdown__Item"
              key={label.id}
              onClick={() => onChangeHandler(label)}
              // ref={listRef}
            >
              <svg
                className="LabelsDropdown__Item__ColorIcon"
                fill={label.color.colorValue}
              >
                <use xlinkHref="#tag" />
              </svg>
              {label.name}
              <span className="LabelsDropdown__Item__Count">
                {label.todosCount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Portal>
  ) : null;
};

LabelsDropdown.propTypes = {
  labels: array.isRequired,
};

export const mapStateToProps = (state) => ({
  labels: labelsSelector(state),
});

export default connect(mapStateToProps)(LabelsDropdown);
