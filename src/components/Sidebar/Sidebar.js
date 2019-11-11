import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import "./Sidebar.styles.scss";

import * as ROUTES from "../../constants/routes";

import LabelSidebarItemContainer from "../../redux/containers/components/LabelSidebarItemContainer";
import ProjectSidebarItemContainer from "../../redux/containers/components/ProjectSidebarItemContainer";
import SidebarSkeletonContainer from "../../redux/containers/components/SidebarSkeletonContainer";
import UserAvatarContainer from "../../redux/containers/components/UserAvatarContainer";
import AddNew from "../AddNew/AddNew";

import { useDisableSidebarBackground, useAnimation } from "../../hooks";

function Sidebar({
  projects,
  labels,
  menu,
  closeMenu,
  openAddProjectModal,
  openAddLabelModal,
  appData: { initialDataLoaded = false } = {},
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
      {initialDataLoaded ? (
        <nav>
          <ul className="Sidebar__Section">
            <li className="Sidebar__CurrentUser_Wrapper">
              <UserAvatarContainer />
            </li>
            <li className="Sidebar__Section__Item Sidebar__ProfileLink">
              <NavLink
                activeClassName="Sidebar__Link--Active"
                className="Sidebar__Link"
                to={ROUTES.PROFILE}
              >
                <svg className="Sidebar__Section__Item__Icon">
                  <use xlinkHref="#settings" />
                </svg>
                My account
              </NavLink>
            </li>
            <li className="Sidebar__Section__Item">
              <NavLink
                activeClassName="Sidebar__Link--Active"
                className="Sidebar__Link"
                to={ROUTES.INBOX}
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
                to={ROUTES.TODAY}
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
                to={ROUTES.NEXT_DAYS}
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
              <NavLink
                className="Sidebar__Section__Title__SeeAll"
                to={ROUTES.PROJECTS}
              >
                See all
              </NavLink>
            </li>
            {projects &&
              projects.map((project) => (
                <ProjectSidebarItemContainer
                  key={project.id}
                  projectID={project.id}
                />
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
              <NavLink
                className="Sidebar__Section__Title__SeeAll"
                to={ROUTES.LABELS}
              >
                See all
              </NavLink>
            </li>
            {labels &&
              labels.map((label) => (
                <LabelSidebarItemContainer key={label.id} labelID={label.id} />
              ))}
            <li className="Sidebar__AddNew__Button">
              <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
            </li>
          </ul>
        </nav>
      ) : (
        <SidebarSkeletonContainer />
      )}
    </aside>
  );
}

export default Sidebar;
