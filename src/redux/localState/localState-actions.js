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
