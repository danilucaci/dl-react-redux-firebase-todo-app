import React, {
  useRef,
  // useEffect
} from "react";
import { connect } from "react-redux";
import { array } from "prop-types";
import classnames from "classnames";

import "./LabelsDropdown.styles.scss";
import Portal from "../Portal/Portal";
import { labelsSelector } from "../../redux/labels/labels-selectors";
import { useOnClickOutside, useKeyUpPress } from "../../hooks";

function LabelsDropdown({
  labels,
  onChangeHandler,
  escapeKeyHandler,
  clickOutsideHandler,
}) {
  const listClasses = classnames({
    LabelsDropdown__List: true,
    // [`LabelsDropdown__List--Visible`]: Boolean(visible),
  });

  const dropdownRef = useRef(null);
  // const listRef = useRef(null);

  useOnClickOutside(dropdownRef, clickOutsideHandler);
  useKeyUpPress("Escape", escapeKeyHandler);

  // useEffect(() => {
  //   if (listRef.current) {
  //     console.log(listRef.current);
  //   }
  // });

  return labels ? (
    <Portal id="labels-dropdown-portal">
      <div className="LabelsDropdown__Overlay">
        <ul className={listClasses} ref={dropdownRef}>
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
}

LabelsDropdown.propTypes = {
  labels: array.isRequired,
};

export const mapStateToProps = (state) => ({
  labels: labelsSelector(state),
});

export default connect(mapStateToProps)(LabelsDropdown);
