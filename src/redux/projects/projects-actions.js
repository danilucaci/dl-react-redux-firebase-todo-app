import ProjectsTypes from "./projects-types";
import { firestore } from "../../firebase/firebase";

import { currentUserSelector } from "../user/user-selectors";
import * as COLLECTIONS from "../../constants/collections";
import * as COLLECTION_LIMITS from "../../constants/collectionLimits";
import getObjectFromDocs from "../../utils/firebase/getObjectFromDocs";
import getObjectFromSingleDoc from "../../utils/firebase/getObjectFromSingleDoc";
import {
  enqueueErrorSnackbar,
  setInitialProjectsLoaded,
} from "../localState/localState-actions";
import { addUserProject } from "../../utils/firebase/helpers";

export const setLocalProjects = (projects) => ({
  type: ProjectsTypes.SET_PROJECTS,
  payload: projects,
});

export const addLocalProject = (project) => ({
  type: ProjectsTypes.ADD_PROJECT,
  payload: project,
});

export const updateLocalProject = (project) => ({
  type: ProjectsTypes.UPDATE_PROJECT,
  payload: project,
});

export const removeLocalProject = (projectID) => ({
  type: ProjectsTypes.REMOVE_PROJECT,
  payload: projectID,
});

export const addProject = (project) => {
  return async (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());

    if (currentUser && currentUser.id) {
      const newProject = {
        uid: currentUser.id,
        ...project,
      };

      await addUserProject(currentUser.id, newProject).catch((error) => {
        dispatch(enqueueErrorSnackbar(error.message));
      });
    } else {
      dispatch(
        enqueueErrorSnackbar("Couldn’t create the project. No user was found"),
      );
    }
  };
};

export function subscribeToProjects() {
  return (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());
    let mounted = false;

    /**
     * The first query snapshot contains `added` events for
     * all existing documents that match the query.
     *
     * This is because you're getting a set of changes that bring
     * your query snapshot current with the initial state of the query.
     *
     * This allows you, for instance, to directly populate your UI
     * from the changes you receive in the first query snapshot,
     * without needing to add special logic for handling the initial state.
     */
    function handleDocChanges(change) {
      if (change.type === "added") {
        dispatch(addLocalProject(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "modified") {
        dispatch(updateLocalProject(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "removed") {
        dispatch(removeLocalProject(change.doc.id));
      }
    }

    try {
      if (currentUser && currentUser.id) {
        const unsuscribeFromProjectsCollection = firestore
          .collection(COLLECTIONS.USERS)
          .doc(currentUser.id)
          .collection(COLLECTIONS.PROJECTS)
          .limit(COLLECTION_LIMITS.PROJECTS)
          .onSnapshot(
            function handleProjectsSnapshot(snapshot) {
              if (!mounted) {
                dispatch(setLocalProjects(getObjectFromDocs(snapshot.docs)));
                dispatch(setInitialProjectsLoaded());
              }
              if (mounted) {
                snapshot
                  .docChanges()
                  .forEach((change) => handleDocChanges(change));
              }

              mounted = true;
            },
            function handleProjectsError(error) {
              dispatch(enqueueErrorSnackbar(error.message));
            },
          );

        function unsuscribeCallback() {
          unsuscribeFromProjectsCollection &&
            unsuscribeFromProjectsCollection();
        }

        return unsuscribeCallback;
      }
    } catch (error) {
      dispatch(enqueueErrorSnackbar(error.message));
    }

    return null;
  };
}
