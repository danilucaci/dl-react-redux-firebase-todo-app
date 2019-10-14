import React from "react";
import classnames from "classnames";
import { Switch, Route } from "react-router-dom";

import "./App.scss";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Todos from "./pages/Todos/Todos";
import NotFound from "./pages/NotFound/NotFound";
import Today from "./pages/Today/Today";
import Tomorrow from "./pages/Tomorrow/Tomorrow";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import Label from "./pages/Label/Label";
import Labels from "./pages/Labels/Labels";

function App() {
  const appClasses = classnames({
    App: true,
  });

  return (
    <div className={appClasses}>
      <SVGSprite />
      <Header />
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/todos" component={Todos} />
        <Route path="/today" component={Today} />
        <Route path="/tomorrow" component={Tomorrow} />
        <Route path="/project/:projectID" component={Project} />
        <Route path="/projects" component={Projects} />
        <Route path="/label/:labelID" component={Label} />
        <Route path="/labels" component={Labels} />
        <Route path="/" exact component={Home} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
