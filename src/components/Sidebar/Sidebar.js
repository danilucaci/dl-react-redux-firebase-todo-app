import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";

import "./Sidebar.styles.scss";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";
import SidebarItem from "../SidebarItem/SidebarItem";
import AddNew from "../AddNew/AddNew";

import { projectsSelector } from "../../redux/projects/projects-selectors";
import { labelsSelector } from "../../redux/labels/labels-selectors";

function Sidebar(props) {
  const sidebarClasses = classnames({
    Sidebar: true,
    col: true,
    [`col-m-3`]: true,
    [`col-xl-4`]: true,
  });

  const { projects, labels } = props;

  return (
    <aside className={sidebarClasses}>
      <nav>
        <ul className="Sidebar__Section">
          <NavLink className="Sidebar__Avatar__Link" to="/profile">
            <li className="Sidebar__Avatar">
              <img
                src={avatarPlaceholder}
                alt="Dani’s profile"
                className="Sidebar__Avatar__Image"
              />
              Dani Lucaci
            </li>
          </NavLink>
          <li className="Sidebar__Section__Item">
            <NavLink className="Sidebar__Link" to="/todos">
              <svg className="Sidebar__Section__Item__Icon">
                <use xlinkHref="#home" />
              </svg>
              Todos
              <span className="Sidebar__Section__Item__Count">15</span>
            </NavLink>
          </li>
          <li className="Sidebar__Section__Item">
            <NavLink className="Sidebar__Link" to="/today">
              <svg className="Sidebar__Section__Item__Icon Sidebar__Section__Item__Icon__Day">
                <use xlinkHref="#calendar-day" />
                <text transform="translate(4 2)">
                  <tspan x="7.7" y="14.5" textAnchor="middle">
                    {new Date().getDate()}
                  </tspan>
                </text>
              </svg>
              Today
              <span className="Sidebar__Section__Item__Count">5</span>
            </NavLink>
          </li>
          <li className="Sidebar__Section__Item">
            <NavLink className="Sidebar__Link" to="/tomorrow">
              <svg className="Sidebar__Section__Item__Icon">
                <use xlinkHref="#calendar-base" />
              </svg>
              Tomorrow
              <span className="Sidebar__Section__Item__Count">11</span>
            </NavLink>
          </li>
        </ul>
        <ul className="Sidebar__Section">
          <li className="Sidebar__Section__Title">
            <button className="Sidebar__Section__Title__Button">
              <svg className="Sidebar__Section__Title__Icon">
                <use xlinkHref="#chevron-down" />
              </svg>
              Projects
            </button>
            <NavLink className="Sidebar__Section__Title__SeeAll" to="/projects">
              See all
            </NavLink>
          </li>
          {projects &&
            projects.map((project) => (
              <SidebarItem
                key={project.id}
                iconColor={project.color.colorValue}
                taskCount={project.taskCount}
                path={`/project/${project.name}`}
              >
                {project.name}
              </SidebarItem>
            ))}
          <li className="Sidebar__AddNew__Button">
            <AddNew>Add project</AddNew>
          </li>
        </ul>
        <ul className="Sidebar__Section">
          <li className="Sidebar__Section__Title">
            <button className="Sidebar__Section__Title__Button">
              <svg className="Sidebar__Section__Title__Icon">
                <use xlinkHref="#chevron-down" />
              </svg>
              Labels
            </button>
            <NavLink className="Sidebar__Section__Title__SeeAll" to="/labels">
              See all
            </NavLink>
          </li>
          {labels &&
            labels.map((label) => (
              <SidebarItem
                key={label.id}
                iconColor={label.color.colorValue}
                taskCount={label.taskCount}
                path={`/label/${label.name}`}
              >
                {label.name}
              </SidebarItem>
            ))}
          <li className="Sidebar__AddNew__Button">
            <AddNew>Add label</AddNew>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  labels: labelsSelector(state),
});

export default connect(mapStateToProps)(Sidebar);
