import React from "react";
import { connect } from "react-redux";
import { array } from "prop-types";

import "./ProjectsDropdown.styles.scss";

import Portal from "../Portal/Portal";
import { allProjectsSelector } from "../../redux/projects/projects-selectors";
import { useRectSize } from "../../hooks";

const ProjectsDropdown = ({ projects, onChangeHandler, position }) => {
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
};

export const mapStateToProps = (state) => ({
  projects: allProjectsSelector(state),
});

export default connect(mapStateToProps)(ProjectsDropdown);
