import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { string, number, node } from "prop-types";

function SidebarItem(props) {
  const { path, iconColor, todosCount, children } = props;

  const sidebarItemClasses = classnames({
    Sidebar__Section__Item: true,
  });

  return (
    <li className={sidebarItemClasses}>
      <NavLink
        to={path.toLowerCase()}
        activeClassName="Sidebar__Link--Active"
        className="Sidebar__Link"
      >
        <svg className="Sidebar__Section__Item__Color__Icon" fill={iconColor}>
          <use xlinkHref="#color" />
        </svg>
        {children}
        <span className="Sidebar__Section__Item__Count">{todosCount}</span>
      </NavLink>
    </li>
  );
}

SidebarItem.propTypes = {
  path: string.isRequired,
  iconColor: string.isRequired,
  todosCount: number.isRequired,
  children: node.isRequired,
};

export default SidebarItem;
