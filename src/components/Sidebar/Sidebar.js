import React, { useEffect, useRef } from "react";
import { string, bool, number, arrayOf, func, shape } from "prop-types";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import "./Sidebar.styles.scss";

import * as ROUTES from "../../constants/routes";

import LabelSidebarItemContainer from "../../redux/containers/components/LabelSidebarItemContainer";
import ProjectSidebarItemContainer from "../../redux/containers/components/ProjectSidebarItemContainer";
import SidebarSkeletonContainer from "../../redux/containers/components/SidebarSkeletonContainer";
import UserAvatarContainer from "../../redux/containers/components/UserAvatarContainer";
import AddNew from "../AddNew/AddNew";
import SidebarSignoutButton from "../SidebarSignoutButton/SidebarSignoutButton";

import { useDisableSidebarBackground, useAnimation } from "../../hooks";

function Sidebar({
  inboxTodosCount,
  todayTodosCount,
  nextDaysTodosCount,
  projectIds,
  labelIds,
  menu: { menuOpen = false } = {},
  closeMenu,
  logoutUser,
  openAddProjectModal,
  openAddLabelModal,
  appData: { initialDataLoaded = false } = {},
}) {
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
                <span className="Sidebar__Section__Item__Count">
                  {inboxTodosCount}
                </span>
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
                <span className="Sidebar__Section__Item__Count">
                  {todayTodosCount}
                </span>
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
                <span className="Sidebar__Section__Item__Count">
                  {nextDaysTodosCount}
                </span>
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
            {projectIds &&
              projectIds.map((projectId) => (
                <ProjectSidebarItemContainer
                  key={projectId}
                  projectID={projectId}
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
            {labelIds &&
              labelIds.map((labelId) => (
                <LabelSidebarItemContainer key={labelId} labelID={labelId} />
              ))}
            <li className="Sidebar__AddNew__Button">
              <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
            </li>
            <li className="Sidebar__Signout__Button">
              <SidebarSignoutButton onClick={() => logoutUser()} />
            </li>
          </ul>
        </nav>
      ) : (
        <SidebarSkeletonContainer />
      )}
    </aside>
  );
}

Sidebar.propTypes = {
  inboxTodosCount: number.isRequired,
  todayTodosCount: number.isRequired,
  nextDaysTodosCount: number.isRequired,
  projectIds: arrayOf(string),
  labelIds: arrayOf(string),
  menu: shape({
    menuOpen: bool.isRequired,
  }),
  closeMenu: func.isRequired,
  logoutUser: func.isRequired,
  openAddProjectModal: func.isRequired,
  openAddLabelModal: func.isRequired,
  appData: shape({ initialDataLoaded: bool }),
};

export default Sidebar;
