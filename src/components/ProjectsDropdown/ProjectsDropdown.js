import React, {
  useRef,
  //  useEffect
} from "react";
import { connect } from "react-redux";
import { array } from "prop-types";
import classnames from "classnames";

import "./ProjectsDropdown.styles.scss";

import Portal from "../Portal/Portal";
import { allProjectsSelector } from "../../redux/projects/projects-selectors";
import { useOnClickOutside, useKeyUpPress } from "../../hooks";

const ProjectsDropdown = ({
  projects,
  onChangeHandler,
  escapeKeyHandler,
  clickOutsideHandler,
}) => {
  const listClasses = classnames({
    ProjectsDropdown__List: true,
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

  return (
    <Portal id="projects-dropdown-portal">
      <div className="ProjectsDropdown__Overlay">
        <ul className={listClasses} ref={dropdownRef}>
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
};

export const mapStateToProps = (state) => ({
  projects: allProjectsSelector(state),
});

export default connect(mapStateToProps)(ProjectsDropdown);
