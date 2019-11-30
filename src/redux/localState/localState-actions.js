import LocalStateTypes from "./localState-types";
import uuid from "uuid";

export const toggleMenu = () => ({
  type: LocalStateTypes.TOGGLE_MENU,
});

export const closeMenu = () => ({
  type: LocalStateTypes.CLOSE_MENU,
});

export const openAddTodoModal = () => ({
  type: LocalStateTypes.OPEN_ADD_TODO_MODAL,
});

export const closeAddTodoModal = () => ({
  type: LocalStateTypes.CLOSE_ADD_TODO_MODAL,
});

export const openAddProjectModal = () => ({
  type: LocalStateTypes.OPEN_ADD_PROJECT_MODAL,
});

export const closeAddProjectModal = () => ({
  type: LocalStateTypes.CLOSE_ADD_PROJECT_MODAL,
});

export const openAddLabelModal = () => ({
  type: LocalStateTypes.OPEN_ADD_LABEL_MODAL,
});

export const closeAddLabelModal = () => ({
  type: LocalStateTypes.CLOSE_ADD_LABEL_MODAL,
});

export const openSearchModal = () => ({
  type: LocalStateTypes.OPEN_SEARCH_MODAL,
});

export const closeSearchModal = () => ({
  type: LocalStateTypes.CLOSE_SEARCH_MODAL,
});

export const setInitialDataLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_DATA_LOADED,
});

export const setInitialTodosLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_TODOS_LOADED,
});

export const setInitialProjectsLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_PROJECTS_LOADED,
});

export const setInitialLabelsLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_LABELS_LOADED,
});

export const setInitialColorsLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_COLORS_LOADED,
});

export const enqueueSnackbar = (notification) => ({
  type: LocalStateTypes.ENQUEUE_SNACKBAR,
  payload: {
    key: uuid.v4(),
    notification,
  },
});

export const enqueueSuccessSnackbar = (message) => ({
  type: LocalStateTypes.ENQUEUE_SNACKBAR,
  payload: {
    key: uuid.v4(),
    notification: {
      message,
      options: {
        variant: "success",
      },
    },
  },
});

export const enqueueErrorSnackbar = (message) => ({
  type: LocalStateTypes.ENQUEUE_SNACKBAR,
  payload: {
    key: uuid.v4(),
    notification: {
      message,
      options: {
        variant: "error",
      },
    },
  },
});

export const closeSnackbar = (key) => ({
  type: LocalStateTypes.CLOSE_SNACKBAR,
  payload: {
    key,
    dismissAll: !key, // dismiss all if no key has been defined
  },
});

export const removeSnackbar = (key) => ({
  type: LocalStateTypes.REMOVE_SNACKBAR,
  payload: key,
});

export const setLiveRegionMessage = (message) => ({
  type: LocalStateTypes.SET_LIVE_REGION_MESSAGE,
  payload: message,
});

export const clearLiveRegionMessage = () => ({
  type: LocalStateTypes.CLEAR_LIVE_REGION_MESSAGE,
});
