import ColorsTypes from "./colors-types";
import { firestore } from "../../firebase/firebase";

import { currentUserSelector } from "../user/user-selectors";
import * as COLLECTIONS from "../../constants/collections";
import * as COLLECTION_LIMITS from "../../constants/collectionLimits";
import getObjectFromDocs from "../../utils/firebase/getObjectFromDocs";
import {
  setAppDataErrors,
  setInitialColorsLoaded,
} from "../localState/localState-actions";
import getObjectFromSingleDoc from "../../utils/firebase/getObjectFromSingleDoc";

export const setLocalColors = (colors) => ({
  type: ColorsTypes.SET_COLORS,
  payload: colors,
});

export const addLocalColor = (color) => ({
  type: ColorsTypes.ADD_COLOR,
  payload: color,
});

export const updateLocalColor = (color) => ({
  type: ColorsTypes.UPDATE_COLOR,
  payload: color,
});

export const removeLocalColor = (colorID) => ({
  type: ColorsTypes.REMOVE_COLOR,
  payload: colorID,
});

export function subscribeToColors() {
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
        dispatch(addLocalColor(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "modified") {
        dispatch(updateLocalColor(getObjectFromSingleDoc(change.doc)));
      }
      if (change.type === "removed") {
        dispatch(removeLocalColor(change.doc.id));
      }
    }

    try {
      if (currentUser && currentUser.id) {
        const unsuscribeFromColorsCollection = firestore
          .collection(COLLECTIONS.COLORS)
          .limit(COLLECTION_LIMITS.COLORS)
          .onSnapshot(
            function handleColorsSnapshot(snapshot) {
              if (!mounted) {
                dispatch(setLocalColors(getObjectFromDocs(snapshot.docs)));
                dispatch(setInitialColorsLoaded());
              }
              if (mounted) {
                snapshot
                  .docChanges()
                  .forEach((change) => handleDocChanges(change));
              }

              mounted = true;
            },
            function handleColorsError(error) {
              dispatch(setAppDataErrors(error.message));
            },
          );

        function unsuscribeCallback() {
          unsuscribeFromColorsCollection && unsuscribeFromColorsCollection();
        }

        return unsuscribeCallback;
      }
    } catch (error) {
      dispatch(setAppDataErrors(error.message));
    }

    return null;
  };
}
