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
import AriaText from "../AriaText/AriaText";

import {
  useDisableSidebarBackground,
  useAnimation,
  useCollapsible,
} from "../../hooks";

function ProjectsList({ projectIds, openAddProjectModal }) {
  const [
    collapsibleClasses,
    collapsibleNodeRef,
    collapsibleItemRef,
    collapsibleExpanded,
    collapsibleHeight,
    handleTransitionEnd,
    toggleCollapsible,
    isCollapsibleVisible,
  ] = useCollapsible(projectIds);

  const toggleIconClasses = classnames({
    Sidebar__Projects__Section__Title__Icon: true,
    [`Sidebar__Projects__Section__Title__Icon--isExpanded`]: isCollapsibleVisible,
  });

  return (
    <div className="Sidebar__Section" aria-label="projects">
      <div className="Sidebar__Section__Title">
        <button
          className="Sidebar__Section__Title__Button"
          aria-expanded={collapsibleExpanded}
          onClick={toggleCollapsible}
        >
          <svg className={toggleIconClasses}>
            <use xlinkHref="#chevron-right" />
          </svg>
          <AriaText>Collapse </AriaText>
          Projects
          <AriaText> list</AriaText>
        </button>
        <NavLink
          className="Sidebar__Section__Title__SeeAll"
          to={ROUTES.PROJECTS}
        >
          See all
          <AriaText> projects</AriaText>
        </NavLink>
      </div>
      <ul
        className={`Sidebar__Items__List ${collapsibleClasses}`}
        ref={collapsibleNodeRef}
        style={{ height: collapsibleHeight }}
        onTransitionEnd={handleTransitionEnd}
      >
        {projectIds &&
          projectIds.map((projectId) => (
            <ProjectSidebarItemContainer
              key={projectId}
              projectID={projectId}
              ref={collapsibleItemRef}
            />
          ))}
      </ul>
      <div className="Sidebar__AddNew__Button">
        <AddNew onClick={() => openAddProjectModal()}>Add project</AddNew>
      </div>
    </div>
  );
}

function LabelsList({ labelIds, openAddLabelModal, logoutUser }) {
  const [
    collapsibleClasses,
    collapsibleNodeRef,
    collapsibleItemRef,
    collapsibleExpanded,
    collapsibleHeight,
    handleTransitionEnd,
    toggleCollapsible,
    isCollapsibleVisible,
  ] = useCollapsible(labelIds);

  const toggleIconClasses = classnames({
    Sidebar__Labels__Section__Title__Icon: true,
    [`Sidebar__Labels__Section__Title__Icon--isExpanded`]: isCollapsibleVisible,
  });

  return (
    <div className="Sidebar__Section" aria-label="labels">
      <div className="Sidebar__Section__Title">
        <button
          className="Sidebar__Section__Title__Button"
          aria-expanded={collapsibleExpanded}
          onClick={toggleCollapsible}
        >
          <svg className={toggleIconClasses}>
            <use xlinkHref="#chevron-right" />
          </svg>
          <AriaText>Collapse </AriaText>
          Labels
          <AriaText> list</AriaText>
        </button>
        <NavLink className="Sidebar__Section__Title__SeeAll" to={ROUTES.LABELS}>
          See all
          <AriaText> labels</AriaText>
        </NavLink>
      </div>
      <ul
        className={`Sidebar__Items__List ${collapsibleClasses}`}
        ref={collapsibleNodeRef}
        style={{ height: collapsibleHeight }}
        onTransitionEnd={handleTransitionEnd}
      >
        {labelIds &&
          labelIds.map((labelId) => (
            <LabelSidebarItemContainer
              key={labelId}
              labelID={labelId}
              ref={collapsibleItemRef}
            />
          ))}
      </ul>
      <div className="Sidebar__AddNew__Button">
        <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
      </div>
      <div className="Sidebar__Signout__Button">
        <SidebarSignoutButton onClick={() => logoutUser()} />
      </div>
    </div>
  );
}

function SidebarContents({
  inboxTodosCount,
  todayTodosCount,
  nextDaysTodosCount,
  projectIds,
  labelIds,
  logoutUser,
  openAddProjectModal,
  openAddLabelModal,
}) {
  return (
    <>
      <ul className="Sidebar__Section" aria-label="main pages">
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
              <AriaText>with </AriaText>
              {inboxTodosCount}
              <AriaText> todos</AriaText>
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
              <text transform="translate(4 2)" aria-hidden="true">
                <tspan x="7.7" y="14.5" textAnchor="middle">
                  {new Date().getDate()}
                </tspan>
              </text>
            </svg>
            Today
            <span className="Sidebar__Section__Item__Count">
              <AriaText>with </AriaText>
              {todayTodosCount}
              <AriaText>todos</AriaText>
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
              <AriaText>with </AriaText>
              {nextDaysTodosCount}
              <AriaText>todos</AriaText>
            </span>
          </NavLink>
        </li>
      </ul>
      <ProjectsList
        projectIds={projectIds}
        openAddProjectModal={openAddProjectModal}
      />
      <LabelsList
        labelIds={labelIds}
        openAddLabelModal={openAddLabelModal}
        logoutUser={logoutUser}
      />
    </>
  );
}

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
    <nav
      className={sidebarClasses}
      ref={sidebarRef}
      aria-expanded={menuOpen ? true : false}
      aria-label="primary"
    >
      {initialDataLoaded ? (
        <SidebarContents
          inboxTodosCount={inboxTodosCount}
          todayTodosCount={todayTodosCount}
          nextDaysTodosCount={nextDaysTodosCount}
          projectIds={projectIds}
          labelIds={labelIds}
          logoutUser={logoutUser}
          openAddProjectModal={openAddProjectModal}
          openAddLabelModal={openAddLabelModal}
        />
      ) : (
        <SidebarSkeletonContainer />
      )}
    </nav>
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
