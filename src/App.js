import "./App.scss";
import "focus-visible";

import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Inbox from "./pages/Inbox/Inbox";
import NotFound from "./pages/NotFound/NotFound";
import Today from "./pages/Today/Today";
import NextDays from "./pages/NextDays/NextDays";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import Label from "./pages/Label/Label";
import Labels from "./pages/Labels/Labels";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import AddProjectModal from "./components/AddProjectModal/AddProjectModal";
import AddLabelModal from "./components/AddLabelModal/AddLabelModal";

import { projectsSelector } from "./redux/projects/projects-selectors";
import { labelsSelector } from "./redux/labels/labels-selectors";
import { currentUserSelector } from "./redux/user/user-selectors";
import { modalsSelector } from "./redux/localState/localState-selectors";
import { menuSelector } from "./redux/localState/localState-selectors";
import { closeMenu } from "./redux/localState/localState-actions";

function App(props) {
  const appClasses = classnames({
    App: true,
  });

  let location = useLocation();
  const prevLocation = useRef(null);

  const {
    labels,
    projects,
    // currentUser
    modalsState,
    menu: { menuOpen },
    dispatch,
  } = props;

  useEffect(() => {
    if (menuOpen) {
      if (prevLocation.current) {
        if (prevLocation.current.pathname !== location.pathname) {
          dispatch(closeMenu());
        }
      }
    }

    return () => {
      prevLocation.current = location;
    };
  }, [dispatch, location, menuOpen]);

  const {
    addTodoModalActive,
    addProjectModalActive,
    addLabelModalActive,
  } = modalsState;

  return (
    <div className={appClasses}>
      <SVGSprite />
      <Header />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>
        <Route path="/today">
          <Today />
        </Route>
        <Route path="/next-days">
          <NextDays />
        </Route>
        {projects &&
          projects.map((project) => (
            <Route key={project.id} path={`/project/${project.name}`}>
              <Project projectID={project.id} />
            </Route>
          ))}
        <Route path="/projects">
          <Projects />
        </Route>
        {labels &&
          labels.map((label) => (
            <Route key={label.id} path={`/label/${label.name}`}>
              <Label labelID={label.id} />
            </Route>
          ))}
        <Route path="/labels">
          <Labels />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*" exact>
          <NotFound />
        </Route>
      </Switch>
      {addTodoModalActive && <AddTodoModal />}
      {addProjectModalActive && <AddProjectModal />}
      {addLabelModalActive && <AddLabelModal />}
      <Footer />
    </div>
  );
}

export const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  labels: labelsSelector(state),
  currentUser: currentUserSelector(state),
  modalsState: modalsSelector(state),
  menu: menuSelector(state),
});

export default connect(mapStateToProps)(App);
