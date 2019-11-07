import "./App.scss";
import "focus-visible";

import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { Switch, Route, useLocation } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import * as COLLECTIONS from "./constants/collections";

import { firestore } from "./firebase/firebase";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import HeaderContainer from "./redux/containers/components/HeaderContainer";
import Footer from "./components/Footer/Footer";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import InboxContainer from "./redux/containers/pages/InboxContainer";
import NotFound from "./pages/NotFound/NotFound";
import TodayContainer from "./redux/containers/pages/TodayContainer";
import NextDaysContainer from "./redux/containers/pages/NextDaysContainer";
import ProjectContainer from "./redux/containers/pages/ProjectContainer";
import ProjectsContainer from "./redux/containers/pages/ProjectsContainer";
import LabelContainer from "./redux/containers/pages/LabelContainer";
import LabelsContainer from "./redux/containers/pages/LabelsContainer";
import AddTodoModalContainer from "./redux/containers/components/AddTodoModalContainer";
import AddProjectModalContainer from "./redux/containers/components/AddProjectModalContainer";
import AddLabelModalContainer from "./redux/containers/components/AddLabelModalContainer";

import useCollection from "./hooks/firebase/useCollection";

/**
 * Takes in many arguments and filters out falsy values
 * @param {?...any} errors
 * @returns {[string]} Array of errors as strings
 */
export function filterErrors(...errors) {
  return filterStrings(errors).filter(Boolean);
}

export function filterStrings(strings) {
  return strings.filter((str) => typeof str === "string");
}

function App({
  labels,
  projects,
  // currentUser
  modalsState,
  menu,
  closeMenu,
  setColors,
  setTodos,
  setLabels,
  setProjects,
  appData,
  setInitialDataLoaded,
  setAppDataErrors,
}) {
  const { menuOpen = false } = menu;

  const {
    addTodoModalActive = false,
    addProjectModalActive = false,
    addLabelModalActive = false,
  } = modalsState;

  const { loaded: initialDataLoaded = false } = appData;

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

    return () => {
      prevLocation.current = location;
    };
  }, [location, menuOpen, closeMenu]);

  const [projectsError, projectsLoading, projectsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc("BpYGPNAONjDAvdPXMzqf")
      .collection(COLLECTIONS.PROJECTS),
  );

  const [labelsError, labelsLoading, labelsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc("BpYGPNAONjDAvdPXMzqf")
      .collection(COLLECTIONS.LABELS),
  );

  const [todosError, todosLoading, todosData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc("BpYGPNAONjDAvdPXMzqf")
      .collection(COLLECTIONS.TODOS),
  );

  const [colorsError, colorsLoading, colorsData] = useCollection(
    firestore.collection(COLLECTIONS.COLORS),
  );

  useEffect(() => {
    if (projectsError || labelsError || todosError || colorsError) {
      setAppDataErrors(
        filterErrors(projectsError, labelsError, todosError, colorsError),
      );
    }
  }, [colorsError, labelsError, projectsError, todosError, setAppDataErrors]);

  useEffect(() => {
    if (!projectsLoading && !projectsError) {
      setProjects(projectsData);
    }
  }, [projectsData, projectsError, setProjects, projectsLoading]);

  useEffect(() => {
    if (!labelsLoading && !labelsError) {
      setLabels(labelsData);
    }
  }, [labelsData, labelsError, setLabels, labelsLoading]);

  useEffect(() => {
    if (!todosLoading && !todosError) {
      setTodos(todosData);
    }
  }, [todosData, todosError, setTodos, todosLoading]);

  useEffect(() => {
    if (!colorsLoading && !colorsError) {
      setColors(colorsData);
    }
  }, [colorsData, colorsError, setColors, colorsLoading]);

  useEffect(() => {
    if (
      !initialDataLoaded &&
      !projectsLoading &&
      !labelsLoading &&
      !todosLoading &&
      !colorsLoading &&
      !projectsError &&
      !labelsError &&
      !todosError &&
      !colorsError
    ) {
      setInitialDataLoaded();
    }
  }, [
    colorsError,
    colorsLoading,
    labelsError,
    labelsLoading,
    projectsError,
    projectsLoading,
    todosError,
    todosLoading,
    initialDataLoaded,
    setInitialDataLoaded,
  ]);

  return (
    <div className={appClasses}>
      <SVGSprite />
      <HeaderContainer />
      <Switch>
        <Route path={ROUTES.PROFILE}>
          <Profile />
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
        {projects &&
          projects.map((project) => (
            <Route key={project.id} path={`${ROUTES.PROJECT}${project.name}`}>
              <ProjectContainer projectID={project.id} />
            </Route>
          ))}
        <Route path={ROUTES.PROJECTS}>
          <ProjectsContainer />
        </Route>
        {labels &&
          labels.map((label) => (
            <Route key={label.id} path={`${ROUTES.LABEL}${label.name}`}>
              <LabelContainer labelID={label.id} />
            </Route>
          ))}
        <Route path={ROUTES.LABELS}>
          <LabelsContainer />
        </Route>
        <Route path={ROUTES.LOGIN} exact>
          <Login />
        </Route>
        <Route path={ROUTES.SIGN_UP} exact>
          <Signup />
        </Route>
        <Route path={ROUTES.PASSWORD_RESET} exact>
          <PasswordReset />
        </Route>
        <Route path={ROUTES.LANDING} exact>
          <Home />
        </Route>
        <Route path={ROUTES.NOT_FOUND} exact>
          <NotFound />
        </Route>
      </Switch>
      {addTodoModalActive && <AddTodoModalContainer />}
      {addProjectModalActive && <AddProjectModalContainer />}
      {addLabelModalActive && <AddLabelModalContainer />}
      <Footer />
    </div>
  );
}

export default App;
