import "./App.scss";
import "focus-visible";

import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { Switch, Route, useLocation } from "react-router-dom";
import {
  arrayOf,
  oneOf,
  shape,
  oneOfType,
  string,
  number,
  bool,
  func,
} from "prop-types";

import * as ROUTES from "./constants/routes";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import HeaderContainer from "./redux/containers/components/HeaderContainer";
import Footer from "./components/Footer/Footer";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

import LiveRegionContainer from "./redux/containers/components/LiveRegionContainer";
import ToastsNotifierContainer from "./redux/containers/components/ToastsNotifierContainer";
import SearchModalContainer from "./redux/containers/components/SearchModalContainer";
import AddTodoModalContainer from "./redux/containers/components/AddTodoModalContainer";
import AddProjectModalContainer from "./redux/containers/components/AddProjectModalContainer";
import AddLabelModalContainer from "./redux/containers/components/AddLabelModalContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import SignupContainer from "./redux/containers/pages/SignupContainer";
import InboxContainer from "./redux/containers/pages/InboxContainer";
import TodayContainer from "./redux/containers/pages/TodayContainer";
import NextDaysContainer from "./redux/containers/pages/NextDaysContainer";
import ProjectContainer from "./redux/containers/pages/ProjectContainer";
import ProjectsContainer from "./redux/containers/pages/ProjectsContainer";
import LabelContainer from "./redux/containers/pages/LabelContainer";
import LabelsContainer from "./redux/containers/pages/LabelsContainer";
import CookieConsentContainer from "./redux/containers/components/CookieConsentContainer";

import withAuth from "./hoc/withAuth";

function App({
  modalsState: {
    addTodoModalActive = false,
    addProjectModalActive = false,
    addLabelModalActive = false,
    searchModalActive = false,
  } = {},
  menu: { menuOpen = false } = {},
  appData: {
    initialDataLoaded = false,
    initialTodosLoaded = false,
    initialProjectsLoaded = false,
    initialLabelsLoaded = false,
    initialColorsLoaded = false,
  } = {},
  user: { isAuthenticated = false, signupErrors, loginErrors } = {},
  closeMenu,
  setInitialDataLoaded,
  subscribeToColors,
  subscribeToTodos,
  subscribeToLabels,
  subscribeToProjects,
  projects,
  labels,
  setLiveRegionMessage,
  clearSignupError,
  clearLoginError,
}) {
  const appClasses = classnames({
    App: true,
  });

  let location = useLocation();
  const prevLocation = useRef(null);

  useEffect(() => {
    if (menuOpen) {
      if (prevLocation.current) {
        if (prevLocation.current.pathname !== location.pathname) {
          closeMenu();
        }
      }
    }

    if (signupErrors && signupErrors.length) {
      if (prevLocation.current) {
        if (prevLocation.current.pathname !== location.pathname) {
          clearSignupError();
        }
      }
    }

    if (loginErrors && loginErrors.length) {
      if (prevLocation.current) {
        if (prevLocation.current.pathname !== location.pathname) {
          clearLoginError();
        }
      }
    }

    return () => {
      prevLocation.current = location;
    };
  }, [clearLoginError, clearSignupError, closeMenu, location, loginErrors, menuOpen, signupErrors]);

  useEffect(() => {
    if (isAuthenticated && !initialDataLoaded) {
      setLiveRegionMessage("Loading app data");
    }
  }, [isAuthenticated, initialDataLoaded, setLiveRegionMessage]);

  useEffect(() => {
    if (
      isAuthenticated &&
      !initialDataLoaded &&
      initialTodosLoaded &&
      initialProjectsLoaded &&
      initialLabelsLoaded &&
      initialColorsLoaded
    ) {
      setInitialDataLoaded();
    }
  }, [
    isAuthenticated,
    initialDataLoaded,
    initialTodosLoaded,
    initialProjectsLoaded,
    initialLabelsLoaded,
    initialColorsLoaded,
    setInitialDataLoaded,
  ]);

  useEffect(() => {
    let unsuscribeFromProjects;

    async function suscribeToProjects() {
      unsuscribeFromProjects = await subscribeToProjects();
    }

    if (isAuthenticated) {
      suscribeToProjects();
    }

    return () => {
      if (unsuscribeFromProjects) {
        unsuscribeFromProjects();
      }
    };
  }, [subscribeToProjects, isAuthenticated]);

  useEffect(() => {
    let unsuscribeFromLabels;

    async function suscribeToLabels() {
      unsuscribeFromLabels = await subscribeToLabels();
    }

    if (isAuthenticated) {
      suscribeToLabels();
    }

    return () => {
      if (unsuscribeFromLabels) {
        unsuscribeFromLabels();
      }
    };
  }, [isAuthenticated, subscribeToLabels]);

  useEffect(() => {
    let unsuscribeFromColors;

    async function suscribeToColors() {
      unsuscribeFromColors = await subscribeToColors();
    }

    if (isAuthenticated) {
      suscribeToColors();
    }

    return () => {
      if (unsuscribeFromColors) {
        unsuscribeFromColors();
      }
    };
  }, [isAuthenticated, subscribeToColors]);

  useEffect(() => {
    let unsuscribeFromTodos;

    async function suscribeToTodos() {
      unsuscribeFromTodos = await subscribeToTodos();
    }

    if (isAuthenticated) {
      suscribeToTodos();
    }

    return () => {
      if (unsuscribeFromTodos) {
        unsuscribeFromTodos();
      }
    };
  }, [isAuthenticated, subscribeToTodos]);

  return (
    <div className={appClasses}>
      <SVGSprite />
      <HeaderContainer />
      <LiveRegionContainer />
      <CookieConsentContainer />
      <ToastsNotifierContainer />
      <Switch>
        <Route path={ROUTES.LANDING} exact>
          <Home />
        </Route>
        <Route path={ROUTES.LOGIN}>
          <LoginContainer />
        </Route>
        <Route path={ROUTES.SIGN_UP}>
          <SignupContainer />
        </Route>
        <Route path={ROUTES.PASSWORD_RESET}>
          <PasswordReset />
        </Route>
        <Route path={ROUTES.INBOX}>
          <InboxContainer />
        </Route>
        <Route path={ROUTES.TODAY}>
          <TodayContainer />
        </Route>
        <Route path={ROUTES.NEXT_DAYS}>
          <NextDaysContainer />
        </Route>
        <Route path={ROUTES.PROJECTS}>
          <ProjectsContainer />
        </Route>
        {projects &&
          projects.map((project) => (
            <Route key={project.id} path={`${ROUTES.PROJECT}${project.name}`}>
              <ProjectContainer projectID={project.id} />
            </Route>
          ))}
        <Route path={ROUTES.LABELS}>
          <LabelsContainer />
        </Route>
        {labels &&
          labels.map((label) => (
            <Route key={label.id} path={`${ROUTES.LABEL}${label.name}`}>
              <LabelContainer labelID={label.id} />
            </Route>
          ))}
        <Route path={ROUTES.PROFILE}>
          <Profile />
        </Route>
        <Route path={ROUTES.NOT_FOUND}>
          <NotFound />
        </Route>
      </Switch>
      {addTodoModalActive && <AddTodoModalContainer />}
      {addProjectModalActive && <AddProjectModalContainer />}
      {addLabelModalActive && <AddLabelModalContainer />}
      {searchModalActive && <SearchModalContainer />}
      <Footer />
    </div>
  );
}

App.propTypes = {
  modalsState: shape({
    addTodoModalActive: bool.isRequired,
    addProjectModalActive: bool.isRequired,
    addLabelModalActive: bool.isRequired,
    searchModalActive: bool.isRequired,
  }).isRequired,
  menu: shape({
    menuOpen: bool.isRequired,
  }).isRequired,
  user: shape({
    isAuthenticated: bool.isRequired,
  }).isRequired,
  closeMenu: func.isRequired,
  subscribeToColors: func.isRequired,
  subscribeToTodos: func.isRequired,
  subscribeToLabels: func.isRequired,
  subscribeToProjects: func.isRequired,
  setInitialDataLoaded: func.isRequired,
  setLiveRegionMessage: func.isRequired,
  clearSignupError: func.isRequired,
  projects: arrayOf(
    shape({
      id: string,
      uid: string,
      name: string,
      todosCount: number,
      color: shape({
        colorID: string,
        colorName: string,
        colorValue: string,
      }),
    }),
  ).isRequired,
  labels: oneOfType([
    arrayOf(
      shape({
        id: string,
        uid: string,
        name: string,
        todosCount: number,
        color: shape({
          colorID: string,
          colorName: string,
          colorValue: string,
        }),
      }),
    ),
    oneOf([null]),
  ]).isRequired,
};

export default withAuth(App);
