import LocalStateTypes from "./localState-types";

const INITIAL_STATE = {
  menu: {
    menuOpen: false,
    isTransitioning: false,
  },
  modals: {
    addTodoModalActive: false,
    addProjectModalActive: false,
    addLabelModalActive: false,
  },
};

const localStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocalStateTypes.TOGGLE_MENU: {
      return {
        ...state,
        menu: {
          menuOpen: !state.menu.menuOpen,
          isTransitioning: !state.isTransitioning,
        },
      };
    }
    case LocalStateTypes.TOGGLE_MENU_IS_TRANSITIONING: {
      return {
        ...state,
        menu: {
          ...state.menu,
          isTransitioning: !state.isTransitioning,
        },
      };
    }
    case LocalStateTypes.CLOSE_MENU: {
      return {
        ...state,
        menu: {
          menuOpen: false,
          isTransitioning: false,
        },
      };
    }
    case LocalStateTypes.OPEN_ADD_TODO_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addTodoModalActive: true,
        },
      };
    }
    case LocalStateTypes.CLOSE_ADD_TODO_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addTodoModalActive: false,
        },
      };
    }
    case LocalStateTypes.OPEN_ADD_PROJECT_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addProjectModalActive: true,
        },
      };
    }
    case LocalStateTypes.CLOSE_ADD_PROJECT_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addProjectModalActive: false,
        },
      };
    }
    case LocalStateTypes.OPEN_ADD_LABEL_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addLabelModalActive: true,
        },
      };
    }
    case LocalStateTypes.CLOSE_ADD_LABEL_MODAL: {
      return {
        ...state,
        modals: {
          ...state.modals,
          addLabelModalActive: false,
        },
      };
    }
    default:
      return state;
  }
};

export default localStateReducer;
