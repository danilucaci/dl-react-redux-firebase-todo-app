import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { node, shape, bool } from "prop-types";

import * as COLLECTIONS from "../../constants/collections";
import { firestore } from "../../firebase/firebase";
import useCollection from "../../hooks/firebase/useCollection";
import { filterErrors } from "../../utils/helpers";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function log() {
  console.log("%c Fetched Stuff", "color: #07E33A; font-weight: 700");
}

function Dashboard({
  setColors,
  setTodos,
  setLabels,
  setProjects,
  setInitialDataLoaded,
  setAppDataErrors,
  appData: { initialDataLoaded = false } = {},
  currentUser = null,
}) {
  const [projectsError, projectsLoading, projectsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
      .collection(COLLECTIONS.PROJECTS),
  );

  const [labelsError, labelsLoading, labelsData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
      .collection(COLLECTIONS.LABELS),
  );

  const [todosError, todosLoading, todosData] = useCollection(
    firestore
      .collection(COLLECTIONS.USERS)
      .doc(currentUser.id)
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
    log();
  });

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

  return <Redirect to="/app/inbox" />;
}

Dashboard.propTypes = {};

export default withProtectedRoute()(Dashboard);
