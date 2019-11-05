import "./App.scss";
import "focus-visible";

import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { Switch, Route, useLocation } from "react-router-dom";

import * as ROUTES from "./constants/routes";

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

function App({
  labels,
  projects,
  // currentUser
  modalsState,
  menu,
  closeMenu,
}) {
  const { menuOpen } = menu;

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

  const {
    addTodoModalActive,
    addProjectModalActive,
    addLabelModalActive,
  } = modalsState;

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
