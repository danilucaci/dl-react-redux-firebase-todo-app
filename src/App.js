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
        <Route path="/profile" component={Profile} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/today" component={Today} />
        <Route path="/next-days" component={NextDays} />
        {projects &&
          projects.map((project) => (
            <Route
              key={project.id}
              path={`/project/${project.name}`}
              render={(props) => <Project {...props} projectID={project.id} />}
            />
          ))}
        <Route path="/projects" component={Projects} />
        {labels &&
          labels.map((label) => (
            <Route
              key={label.id}
              path={`/label/${label.name}`}
              render={(props) => <Label {...props} labelID={label.id} />}
            />
          ))}
        <Route path="/labels" component={Labels} />
        <Route path="/" exact component={Home} />
        <Route path="*" exact component={NotFound} />
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
