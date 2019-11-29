import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { string, number, shape } from "prop-types";

import * as ROUTES from "../../constants/routes";
import AriaText from "../AriaText/AriaText";

function LabelSidebarItem({
  labelTodosCount = 0,
  label: { name = "Label", color: { colorValue = "#2a2f36" } = {} } = {},
}) {
  const sidebarItemClasses = classnames({
    Sidebar__Section__Item: true,
  });

  return (
    <>
      <li className={sidebarItemClasses}>
        <NavLink
          to={`${ROUTES.LABEL}${name.toLowerCase()}`}
          activeClassName="Sidebar__Link--Active"
          className="Sidebar__Link"
        >
          <svg
            className="Sidebar__Section__Item__Color__Icon"
            fill={colorValue}
          >
            <use xlinkHref="#color" />
          </svg>
          <AriaText>label </AriaText>
          {name}
          <AriaText> with </AriaText>
          <span className="Sidebar__Section__Item__Count">
            {labelTodosCount}
          </span>
          <AriaText> todos</AriaText>
        </NavLink>
      </li>
    </>
  );
}

LabelSidebarItem.propTypes = {
  labelTodosCount: number.isRequired,
  label: shape({
    name: string.isRequired,
    color: shape({ colorValue: string.isRequired }).isRequired,
  }).isRequired,
};

export default LabelSidebarItem;
