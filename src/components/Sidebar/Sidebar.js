import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import "./Sidebar.styles.scss";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";
import SidebarItem from "../SidebarItem/SidebarItem";
import AddNew from "../AddNew/AddNew";

import { useDisableSidebarBackground, useAnimation } from "../../hooks";

function Sidebar({
  projects,
  labels,
  menu,
  closeMenu,
  openAddProjectModal,
  openAddLabelModal,
}) {
  const { menuOpen } = menu;

  const sidebarRef = useRef(null);

  useDisableSidebarBackground(sidebarRef, menuOpen);

  const [isVisible, isTransitioning] = useAnimation(menuOpen);

  useEffect(() => {
    // Breakpoint at which the gutters change size from 16px to 24px
    // Also where fonts change sizes
    // AKA: $grid-gutter-breakpoint-change: "l";
    const mql = window.matchMedia("(min-width: 42.5rem)");

    function handleMatchMedia(e) {
      if (e.matches) {
        if (menuOpen) {
          closeMenu();
        }
      }
    }

    /**
     *  `addEventListener` doesn’t work in Safari
     */
    mql.addListener(handleMatchMedia);

    return () => {
      mql.removeListener(handleMatchMedia);
    };
  }, [closeMenu, isVisible, menuOpen]);

  const sidebarClasses = classnames({
    Sidebar: true,
    [`Sidebar--Visible`]: isVisible,
    [`Sidebar--isTransitioning`]: isTransitioning,
    col: true,
    [`col-l-3`]: true,
    [`col-xl-4`]: true,
  });

  return (
    <aside
      className={sidebarClasses}
      ref={sidebarRef}
      aria-expanded={menuOpen ? true : false}
      aria-label="Navigation sidebar"
    >
      <nav>
        <ul className="Sidebar__Section">
          <NavLink
            activeClassName="Sidebar__Link--Active"
            className="Sidebar__Avatar__Link"
            to="/profile"
          >
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
            <NavLink
              activeClassName="Sidebar__Link--Active"
              className="Sidebar__Link"
              to="/Inbox"
            >
              <svg className="Sidebar__Section__Item__Icon">
                <use xlinkHref="#home" />
              </svg>
              Inbox
              <span className="Sidebar__Section__Item__Count">15</span>
            </NavLink>
          </li>
          <li className="Sidebar__Section__Item">
            <NavLink
              activeClassName="Sidebar__Link--Active"
              className="Sidebar__Link"
              to="/today"
            >
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
            <NavLink
              activeClassName="Sidebar__Link--Active"
              className="Sidebar__Link"
              to="/next-days"
            >
              <svg className="Sidebar__Section__Item__Icon">
                <use xlinkHref="#calendar-base" />
              </svg>
              Next 7 days
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
                todosCount={project.todosCount}
                path={`/project/${project.name}`}
              >
                {project.name}
              </SidebarItem>
            ))}
          <li className="Sidebar__AddNew__Button">
            <AddNew onClick={() => openAddProjectModal()}>Add project</AddNew>
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
                todosCount={label.todosCount}
                path={`/label/${label.name}`}
              >
                {label.name}
              </SidebarItem>
            ))}
          <li className="Sidebar__AddNew__Button">
            <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
