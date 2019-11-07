import LocalStateTypes from "./localState-types";

const INITIAL_STATE = {
  appData: {
    loading: true,
    initialDataLoaded: false,
    errors: null,
  },
  menu: {
    menuOpen: false,
  },
  modals: {
    addTodoModalActive: false,
    addProjectModalActive: false,
    addLabelModalActive: false,
  },
};

const localStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocalStateTypes.SET_INITIAL_DATA_LOADED: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialDataLoaded: true,
          loading: false,
        },
      };
    }
    case LocalStateTypes.SET_APP_DATA_ERRORS: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialDataLoaded: true,
          loading: false,
          errors: action.payload,
        },
      };
    }
    case LocalStateTypes.TOGGLE_MENU: {
      return {
        ...state,
        menu: {
          ...state.menu,
          menuOpen: !state.menu.menuOpen,
        },
        modals: {
          ...state.modals,
          addTodoModalActive: false,
          addProjectModalActive: false,
          addLabelModalActive: false,
        },
      };
    }
    case LocalStateTypes.CLOSE_MENU: {
      return {
        ...state,
        menu: {
          ...state.menu,
          menuOpen: false,
        },
      };
    }
    case LocalStateTypes.OPEN_ADD_TODO_MODAL: {
      return {
        ...state,
        menu: {
          ...state.menu,
          menuOpen: false,
        },
        modals: {
          ...state.modals,
          addTodoModalActive: true,
          addProjectModalActive: false,
          addLabelModalActive: false,
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
        menu: {
          ...state.menu,
          menuOpen: false,
        },
        modals: {
          ...state.modals,
          addProjectModalActive: true,
          addTodoModalActive: false,
          addLabelModalActive: false,
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
        menu: {
          ...state.menu,
          menuOpen: false,
        },
        modals: {
          ...state.modals,
          addProjectModalActive: false,
          addTodoModalActive: false,
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
