import TodosTypes from "./todos-types";
import { currentUserSelector } from "../user/user-selectors";
import * as COLLECTIONS from "../../constants/collections";
import * as COLLECTION_LIMITS from "../../constants/collectionLimits";
import getTodosObjectFromDocs from "../../utils/firebase/getTodosObjectFromDocs";
import {
  enqueueErrorSnackbar,
  setInitialTodosLoaded,
  setLiveRegionMessage,
} from "../localState/localState-actions";
import { firestore } from "../../firebase/firebase";
import {
  addUserTodo,
  setFirebaseTodoCompleted,
  updateFirebaseTodo,
} from "../../utils/firebase/helpers";
import getTodoObjectFromSingleDoc from "../../utils/firebase/getTodoObjectFromSingleDoc";

export const setLocalTodos = (todos) => ({
  type: TodosTypes.SET_TODOS,
  payload: todos,
});

export const removeLocalTodo = (todoID) => ({
  type: TodosTypes.REMOVE_TODO,
  payload: todoID,
});

export const toggleTodoHighlight = (todo) => ({
  type: TodosTypes.TOGGLE_TODO_HIGHLIGHT,
  payload: todo,
});

export const toggleTodoFocus = (todo) => ({
  type: TodosTypes.TOGGLE_TODO_FOCUS,
  payload: todo,
});

export const addLocalTodo = ({ data, shouldFocus }) => ({
  type: TodosTypes.ADD_TODO,
  payload: { data, shouldFocus },
});

export const updateLocalTodo = (todo) => ({
  type: TodosTypes.UPDATE_TODO,
  payload: todo,
});

export const createTodo = (todo) => {
  return async (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());

    if (currentUser && currentUser.id) {
      const newTodo = {
        uid: currentUser.id,
        ...todo,
      };

      await addUserTodo(currentUser.id, newTodo).catch((error) => {
        dispatch(enqueueErrorSnackbar(error.message));
      });
    } else {
      dispatch(
        enqueueErrorSnackbar("Couldn’t create the todo. No user was found"),
      );
    }
  };
};

export const updateTodo = (todoData) => {
  return async (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());

    if (currentUser && currentUser.id) {
      dispatch(
        toggleTodoFocus({
          id: todoData.id,
          isFocused: true,
        }),
      );

      await updateFirebaseTodo(currentUser.id, todoData).catch((error) => {
        dispatch(enqueueErrorSnackbar(error.message));
      });
    } else {
      dispatch(
        enqueueErrorSnackbar("Couldn’t update the todo. No user was found"),
      );
    }
  };
};

export const setTodoCompleted = (todoID) => {
  return async (dispatch, getState) => {
    const currentUser = currentUserSelector(getState());

    if (currentUser && currentUser.id) {
      await setFirebaseTodoCompleted(currentUser.id, todoID).catch((error) => {
        dispatch(enqueueErrorSnackbar(error.message));
      });
    } else {
      dispatch(
        enqueueErrorSnackbar("Couldn’t update the todo. No user was found"),
      );
    }
  };
};

export function subscribeToTodos() {
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
    function handleTodoDocChanges(change) {
      if (change.type === "added") {
        const todoData = getTodoObjectFromSingleDoc(change.doc);

        const dispatchData = {
          data: todoData,
          shouldFocus: true,
        };

        // shouldFocus: Don’t set `isFocused` on the initial demo todos
        // created by the firestore `users/{userId}` `onCreate` trigger.
        if (!currentUser.userDataPopulated) {
          dispatchData.shouldFocus = false;
        }

        dispatch(addLocalTodo(dispatchData));

        if (currentUser.userDataPopulated) {
          dispatch(setLiveRegionMessage(`Added todo ${todoData.name}`));
        }
      }
      if (change.type === "modified") {
        const todoData = getTodoObjectFromSingleDoc(change.doc);
        dispatch(updateLocalTodo(todoData));

        if (currentUser.userDataPopulated) {
          dispatch(setLiveRegionMessage(`Updated todo ${todoData.name}`));
        }
      }
      if (change.type === "removed") {
        const todoData = getTodoObjectFromSingleDoc(change.doc);
        dispatch(removeLocalTodo(todoData.id));

        if (currentUser.userDataPopulated) {
          dispatch(setLiveRegionMessage(`Removed todo ${todoData.name}`));
        }
      }
    }

    try {
      if (currentUser && currentUser.id) {
        const unsuscribeFromTodosCollection = firestore
          .collection(COLLECTIONS.USERS)
          .doc(currentUser.id)
          .collection(COLLECTIONS.TODOS)
          .where("completed", "==", false)
          .limit(COLLECTION_LIMITS.TODOS)
          .onSnapshot(
            function handleTodosSnapshot(snapshot) {
              if (!mounted) {
                dispatch(setLocalTodos(getTodosObjectFromDocs(snapshot.docs)));
                dispatch(setInitialTodosLoaded());
              }
              if (mounted) {
                snapshot
                  .docChanges()
                  .forEach((change) => handleTodoDocChanges(change));
              }

              mounted = true;
            },
            function handleTodosError(error) {
              dispatch(enqueueErrorSnackbar(error.message));
            },
          );

        function unsuscribeCallback() {
          unsuscribeFromTodosCollection && unsuscribeFromTodosCollection();
        }

        return unsuscribeCallback;
      }
    } catch (error) {
      dispatch(enqueueErrorSnackbar(error.message));
    }

    return null;
  };
}
