import "./App.scss";
import "focus-visible";

import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { Switch, Route, useLocation } from "react-router-dom";

import * as ROUTES from "./constants/routes";

import SVGSprite from "./components/SVGSprite/SVGSprite";
import HeaderContainer from "./redux/containers/components/HeaderContainer";
import Footer from "./components/Footer/Footer";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

import AddTodoModalContainer from "./redux/containers/components/AddTodoModalContainer";
import AddProjectModalContainer from "./redux/containers/components/AddProjectModalContainer";
import AddLabelModalContainer from "./redux/containers/components/AddLabelModalContainer";
import DashboardContainer from "./redux/containers/components/DashboardContainer";
import LoginContainer from "./redux/containers/pages/LoginContainer";
import SignupContainer from "./redux/containers/pages/SignupContainer";

import withAuth from "./hoc/withAuth";

function App({ modalsState, menu, closeMenu }) {
  const { menuOpen = false } = menu;

  const {
    addTodoModalActive = false,
    addProjectModalActive = false,
    addLabelModalActive = false,
  } = modalsState;

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

  return (
    <div className={appClasses}>
      <SVGSprite />
      <HeaderContainer />
      <Switch>
        <Route path={ROUTES.LOGIN} exact>
          <LoginContainer />
        </Route>
        <Route path={ROUTES.SIGN_UP} exact>
          <SignupContainer />
        </Route>
        <Route path={ROUTES.PASSWORD_RESET} exact>
          <PasswordReset />
        </Route>
        <Route path={ROUTES.LANDING} exact>
          <Home />
        </Route>
        <DashboardContainer />
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

export default withAuth(App);
