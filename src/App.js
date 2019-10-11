import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.scss";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Today from "./pages/Today/Today";
import Tomorrow from "./pages/Tomorrow/Tomorrow";
import Project from "./pages/Project/Project";
import Projects from "./pages/Projects/Projects";
import Label from "./pages/Label/Label";
import Labels from "./pages/Labels/Labels";

function App() {
  return (
    <div className="App">
      <SVGSprite />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/today" component={Today} />
        <Route path="/tomorrow" component={Tomorrow} />
        <Route path="/project" component={Project} />
        <Route path="/projects" component={Projects} />
        <Route path="/label" component={Label} />
        <Route path="/labels" component={Labels} />
      </Switch>
    </div>
  );
}

export default App;
