import LocalStateTypes from "./localState-types";

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

export const setInitialDataLoaded = () => ({
  type: LocalStateTypes.SET_INITIAL_DATA_LOADED,
});

export const setAppDataErrors = (errors) => ({
  type: LocalStateTypes.SET_APP_DATA_ERRORS,
  payload: errors,
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
