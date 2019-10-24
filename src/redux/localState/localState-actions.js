import LocalStateTypes from "./localState-types";

export const toggleMenu = () => ({
  type: LocalStateTypes.TOGGLE_MENU,
});

export const toggleMenuIsTransitioning = () => ({
  type: LocalStateTypes.TOGGLE_MENU_IS_TRANSITIONING,
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
