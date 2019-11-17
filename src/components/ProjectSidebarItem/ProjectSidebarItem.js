import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { string, number, shape } from "prop-types";

import * as ROUTES from "../../constants/routes";

function ProjectSidebarItem({
  projectTodosCount = 0,
  project: { name = "Project", color: { colorValue = "#2a2f36" } = {} } = {},
}) {
  const sidebarItemClasses = classnames({
    Sidebar__Section__Item: true,
  });

  return (
    <>
      <li className={sidebarItemClasses}>
        <NavLink
          to={`${ROUTES.PROJECT}${name.toLowerCase()}`}
          activeClassName="Sidebar__Link--Active"
          className="Sidebar__Link"
        >
          <svg
            className="Sidebar__Section__Item__Color__Icon"
            fill={colorValue}
          >
            <use xlinkHref="#color" />
          </svg>
          {name}
          <span className="Sidebar__Section__Item__Count">
            {projectTodosCount}
          </span>
        </NavLink>
      </li>
    </>
  );
}

ProjectSidebarItem.propTypes = {
  projectTodosCount: number.isRequired,
  project: shape({
    name: string.isRequired,
    color: shape({ colorValue: string.isRequired }).isRequired,
  }).isRequired,
};

export default ProjectSidebarItem;
