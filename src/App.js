import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.scss";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import Header from "./components/Header/Header";

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

import { projectsSelector } from "./redux/projects/projects-selectors";
import { labelsSelector } from "./redux/labels/labels-selectors";
import { currentUserSelector } from "./redux/user/user-selectors";

function App(props) {
  const appClasses = classnames({
    App: true,
  });

  const {
    labels,
    projects,
    // currentUser
  } = props;

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
    </div>
  );
}

export const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  labels: labelsSelector(state),
  currentUser: currentUserSelector(state),
});

export default connect(mapStateToProps)(App);
