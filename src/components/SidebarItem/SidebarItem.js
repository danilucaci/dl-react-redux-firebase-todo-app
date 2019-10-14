import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { string, number, node } from "prop-types";

import "./SidebarItem.styles.scss";

function SidebarItem(props) {
  const { path, iconColor, taskCount, children } = props;

  const sidebarItemClasses = classnames({
    Sidebar__Item: true,
  });

  return (
    <li className={sidebarItemClasses}>
      <NavLink to={path.toLowerCase()} className="SideItem__Link">
        <svg className="Sidebar__Item__Icon" fill={iconColor}>
          <use xlinkHref="#color" />
        </svg>
        {children}
        <span className="Sidebar__Item__Count">{taskCount}</span>
      </NavLink>
    </li>
  );
}

SidebarItem.propTypes = {
  path: string.isRequired,
  iconColor: string.isRequired,
  taskCount: number.isRequired,
  children: node.isRequired,
};

export default SidebarItem;
