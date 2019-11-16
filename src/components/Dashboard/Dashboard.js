import React, { useEffect } from "react";
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
import { Route } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import Profile from "../../pages/Profile/Profile";
import InboxContainer from "../../redux/containers/pages/InboxContainer";
import TodayContainer from "../../redux/containers/pages/TodayContainer";
import NextDaysContainer from "../../redux/containers/pages/NextDaysContainer";
import ProjectContainer from "../../redux/containers/pages/ProjectContainer";
import ProjectsContainer from "../../redux/containers/pages/ProjectsContainer";
import LabelContainer from "../../redux/containers/pages/LabelContainer";
import LabelsContainer from "../../redux/containers/pages/LabelsContainer";

export function DashboardRoutes({ projects, labels, children }) {
  return (
    <>
      {children}
      <Route path={ROUTES.PROFILE} exact>
        <Profile />
      </Route>
      <Route path={ROUTES.INBOX} exact>
        <InboxContainer />
      </Route>
      <Route path={ROUTES.TODAY} exact>
        <TodayContainer />
      </Route>
      <Route path={ROUTES.NEXT_DAYS} exact>
        <NextDaysContainer />
      </Route>
      {projects &&
        projects.map((project) => (
          <Route key={project.id} path={`${ROUTES.PROJECT}${project.name}`}>
            <ProjectContainer projectID={project.id} />
          </Route>
        ))}
      <Route path={ROUTES.PROJECTS} exact>
        <ProjectsContainer />
      </Route>
      {labels &&
        labels.map((label) => (
          <Route key={label.id} path={`${ROUTES.LABEL}${label.name}`}>
            <LabelContainer labelID={label.id} />
          </Route>
        ))}
      <Route path={ROUTES.LABELS} exact>
        <LabelsContainer />
      </Route>
    </>
  );
}

function Dashboard({
  appData: {
    initialDataLoaded = false,
    initialTodosLoaded = false,
    initialProjectsLoaded = false,
    initialLabelsLoaded = false,
    initialColorsLoaded = false,
  } = {},
  setInitialDataLoaded,
  subscribeToColors,
  subscribeToTodos,
  subscribeToLabels,
  subscribeToProjects,
  projects,
  labels,
  userState: { isAuthenticated } = {},
  children,
}) {
  useEffect(() => {
    if (
      !initialDataLoaded &&
      initialTodosLoaded &&
      initialProjectsLoaded &&
      initialLabelsLoaded &&
      initialColorsLoaded
    ) {
      setInitialDataLoaded();
    }
  }, [
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

    suscribeToProjects();

    return () => {
      if (unsuscribeFromProjects) {
        unsuscribeFromProjects();
      }
    };
  }, [subscribeToProjects]);

  useEffect(() => {
    let unsuscribeFromLabels;

    async function suscribeToLabels() {
      unsuscribeFromLabels = await subscribeToLabels();
    }

    suscribeToLabels();

    return () => {
      if (unsuscribeFromLabels) {
        unsuscribeFromLabels();
      }
    };
  }, [subscribeToLabels]);

  useEffect(() => {
    let unsuscribeFromColors;

    async function suscribeToColors() {
      unsuscribeFromColors = await subscribeToColors();
    }

    suscribeToColors();

    return () => {
      if (unsuscribeFromColors) {
        unsuscribeFromColors();
      }
    };
  }, [subscribeToColors]);

  useEffect(() => {
    let unsuscribeFromTodos;

    async function suscribeToTodos() {
      unsuscribeFromTodos = await subscribeToTodos();
    }

    suscribeToTodos();

    return () => {
      if (unsuscribeFromTodos) {
        unsuscribeFromTodos();
      }
    };
  }, [subscribeToTodos]);

  return isAuthenticated ? (
    <DashboardRoutes projects={projects} labels={labels}>
      {children}
    </DashboardRoutes>
  ) : null;
}

Dashboard.propTypes = {
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
  subscribeToColors: func.isRequired,
  subscribeToTodos: func.isRequired,
  subscribeToLabels: func.isRequired,
  subscribeToProjects: func.isRequired,
  setInitialDataLoaded: func.isRequired,
  userState: shape({
    isAuthenticated: bool.isRequired,
  }).isRequired,
};

Dashboard.defaultProps = {
  labels: null,
};

export default withProtectedRoute()(Dashboard);
