import React from "react";
import { connect } from "react-redux";
import { array, bool, object, func } from "prop-types";

import "./ProjectsDropdown.styles.scss";

import Portal from "../Portal/Portal";
import { allProjectsSelector } from "../../redux/projects/projects-selectors";
import { useRectSize } from "../../hooks";

const ProjectsDropdown = ({
  projects,
  onChangeHandler,
  bottomFixed,
  position,
}) => {
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

  return (
    <Portal id="projects-dropdown-portal">
      <div className="ProjectsDropdown__Overlay">
        <ul className="ProjectsDropdown__List" ref={dropdownRef} style={style}>
          {projects.map((project) => (
            <li
              className="ProjectsDropdown__Item"
              key={project.id}
              onClick={() => onChangeHandler(project)}
              tabIndex="-1"
              // ref={listRef}
            >
              <svg
                className="ProjectsDropdown__Item__ColorIcon"
                fill={project.color.colorValue}
              >
                <use xlinkHref="#color" />
              </svg>
              {project.name}
              <span className="ProjectsDropdown__Item__Count">
                {project.todosCount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Portal>
  );
};

ProjectsDropdown.propTypes = {
  projects: array.isRequired,
  onChangeHandler: func,
  bottomFixed: bool,
  position: object.isRequired,
};

ProjectsDropdown.defaultProps = {
  onChangeHandler: null,
  bottomFixed: false,
};

export const mapStateToProps = (state) => ({
  projects: allProjectsSelector(state),
});

export default connect(mapStateToProps)(ProjectsDropdown);
