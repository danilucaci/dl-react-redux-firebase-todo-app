import React, { useEffect } from "react";
import {
  arrayOf,
  oneOf,
  shape,
  oneOfType,
  string,
  bool,
  number,
  func,
} from "prop-types";
import { Route } from "react-router-dom";

import * as COLLECTIONS from "../../constants/collections";
import * as ROUTES from "../../constants/routes";
import { firestore } from "../../firebase/firebase";
import useCollection from "../../hooks/firebase/useCollection";
import { filterErrors, log } from "../../utils/helpers";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import Profile from "../../pages/Profile/Profile";
import InboxContainer from "../../redux/containers/pages/InboxContainer";
import TodayContainer from "../../redux/containers/pages/TodayContainer";
import NextDaysContainer from "../../redux/containers/pages/NextDaysContainer";
import ProjectContainer from "../../redux/containers/pages/ProjectContainer";
import ProjectsContainer from "../../redux/containers/pages/ProjectsContainer";
import LabelContainer from "../../redux/containers/pages/LabelContainer";
import LabelsContainer from "../../redux/containers/pages/LabelsContainer";

export function Dashboard({
  setColors,
  setTodos,
  setLabels,
  setProjects,
  setInitialDataLoaded,
  setAppDataErrors,
  appData: { initialDataLoaded = false } = {},
  currentUser = null,
  projects,
  labels,
  children,
}) {
  const [projectsError, projectsLoading, projectsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
      .collection(COLLECTIONS.PROJECTS)
      .limit(20),
  );

  const [labelsError, labelsLoading, labelsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
      .collection(COLLECTIONS.LABELS)
      .limit(20),
  );

  const [todosError, todosLoading, todosData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
      .collection(COLLECTIONS.TODOS)
      .limit(40),
  );

  const [colorsError, colorsLoading, colorsData] = useCollection(
    firestore.collection(COLLECTIONS.COLORS).limit(40),
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
    log("Fetched Colors");
  }, [colorsData]);

  useEffect(() => {
    log("Fetched Todos");
  }, [todosData]);

  useEffect(() => {
    log("Fetched Projects");
  }, [projectsData]);

  useEffect(() => {
    log("Fetched Labels");
  }, [labelsData]);

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

function DashboardGateway({
  projects,
  labels,
  setColors,
  setTodos,
  setLabels,
  setProjects,
  setInitialDataLoaded,
  setAppDataErrors,
  appData,
  currentUser = null,
  children,
}) {
  return currentUser ? (
    <Dashboard
      projects={projects}
      labels={labels}
      setColors={setColors}
      setTodos={setTodos}
      setLabels={setLabels}
      setProjects={setProjects}
      setInitialDataLoaded={setInitialDataLoaded}
      setAppDataErrors={setAppDataErrors}
      appData={appData}
      currentUser={currentUser}
    >
      {children}
    </Dashboard>
  ) : null;
}

DashboardGateway.propTypes = {
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
  setColors: func.isRequired,
  setTodos: func.isRequired,
  setLabels: func.isRequired,
  setProjects: func.isRequired,
  setInitialDataLoaded: func.isRequired,
  setAppDataErrors: func.isRequired,
  appData: shape({
    initialDataLoaded: bool,
  }).isRequired,
  currentUser: oneOfType([
    shape({
      id: string,
      displayName: string,
      email: string,
      avatar: string,
      role: arrayOf(string),
    }),
    oneOf([null]),
  ]).isRequired,
};

DashboardGateway.defaultProps = {
  labels: null,
  appData: {
    initialDataLoaded: false,
  },
  currentUser: null,
};

export default withProtectedRoute()(DashboardGateway);
