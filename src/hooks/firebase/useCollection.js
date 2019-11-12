import { useRef, useEffect, useReducer } from "react";

import getDocsObject from "../../utils/firebase/getDocsObject";

export const collectionState = {
  loading: true,
  error: null,
  data: null,
};

export const collectionReducer = (state, action) => {
  switch (action.type) {
    case "save": {
      return {
        ...state,
        data: getDocsObject(action.payload),
        loading: false,
      };
    }
    case "error": {
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null,
      };
    }
    default:
      return state;
  }
};

/**
 * Subscribes to a forestore collection.
 * @param {firestore.Query} query The firestore query to subscribe to.
 * @returns {?Object} Error returned from firestore.
 * @returns {boolean} If the data is still loading.
 * @returns {?string} The data fetched from firestore.
 */
function useCollection(query) {
  const collectionRef = useRef(query);
  const [
    { error = null, loading = false, data = {} } = {},
    dispatch,
  ] = useReducer(collectionReducer, collectionState);

  useEffect(() => {
    if (!collectionRef.current) return;

    const unsubscribe = collectionRef.current.onSnapshot(
      function handleSnapshot(snapshot) {
        return dispatch({ type: "save", payload: snapshot.docs });
      },
      function handleError(error) {
        return dispatch({ type: "error", payload: error.message });
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return [error, loading, data];
}

export default useCollection;
