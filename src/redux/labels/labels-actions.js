import LabelsTypes from "./labels-types";
import { firestore } from "../../firebase/firebase";

import { currentUserSelector } from "../user/user-selectors";
import * as COLLECTIONS from "../../constants/collections";
import * as COLLECTION_LIMITS from "../../constants/collectionLimits";
import getObjectFromDocs from "../../utils/firebase/getObjectFromDocs";
import {
  enqueueErrorSnackbar,
  setInitialLabelsLoaded,
} from "../localState/localState-actions";
import { addUserLabel } from "../../utils/firebase/helpers";
import getObjectFromSingleDoc from "../../utils/firebase/getObjectFromSingleDoc";

export const setLocalLabels = (labels) => ({
  type: LabelsTypes.SET_LABELS,
  payload: labels,
});

export const addLocalLabel = (label) => ({
  type: LabelsTypes.ADD_LABEL,
  payload: label,
});

export const updateLocalLabel = (label) => ({
  type: LabelsTypes.UPDATE_LABEL,
  payload: label,
});

export const removeLocalLabel = (labelID) => ({
  type: LabelsTypes.REMOVE_LABEL,
  payload: labelID,
});

export const addLabel = (label) => {
  return async (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());

    if (currentUser && currentUser.id) {
      const newLabel = {
        uid: currentUser.id,
        ...label,
      };

      await addUserLabel(currentUser.id, newLabel).catch((error) => {
        dispatch(enqueueErrorSnackbar(error.message));
      });
    } else {
      dispatch(
        enqueueErrorSnackbar("Couldn’t create the label. No user was found"),
      );
    }
  };
};

export function subscribeToLabels() {
  return async (dispatch, getState) => {
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
        dispatch(addLocalLabel(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "modified") {
        dispatch(updateLocalLabel(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "removed") {
        dispatch(removeLocalLabel(change.doc.id));
      }
    }

    try {
      if (currentUser && currentUser.id) {
        const unsuscribeFromLabelsCollection = firestore
          .collection(COLLECTIONS.USERS)
          .doc(currentUser.id)
          .collection(COLLECTIONS.LABELS)
          .limit(COLLECTION_LIMITS.LABELS)
          .onSnapshot(
            function handleLabelsSnapshot(snapshot) {
              if (!mounted) {
                dispatch(setLocalLabels(getObjectFromDocs(snapshot.docs)));
                dispatch(setInitialLabelsLoaded());
              }
              if (mounted) {
                snapshot
                  .docChanges()
                  .forEach((change) => handleDocChanges(change));
              }

              mounted = true;
            },
            function handleLabelsError(error) {
              dispatch(enqueueErrorSnackbar(error.message));
            },
          );

        function unsuscribeCallback() {
          unsuscribeFromLabelsCollection && unsuscribeFromLabelsCollection();
        }

        return unsuscribeCallback;
      }
    } catch (error) {
      dispatch(enqueueErrorSnackbar(error.message));
    }

    return null;
  };
}
