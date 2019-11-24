import LocalStateTypes from "./localState-types";

const INITIAL_STATE = {
  appData: {
    initialDataLoaded: false,
    initialTodosLoaded: false,
    initialProjectsLoaded: false,
    initialLabelsLoaded: false,
    initialColorsLoaded: false,
    notifications: [],
    skeletonTodos: 3,
    skeletonSidebarItems: 3,
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
        },
      };
    }
    case LocalStateTypes.SET_INITIAL_TODOS_LOADED: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialTodosLoaded: true,
        },
      };
    }
    case LocalStateTypes.SET_INITIAL_PROJECTS_LOADED: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialProjectsLoaded: true,
        },
      };
    }
    case LocalStateTypes.SET_INITIAL_LABELS_LOADED: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialLabelsLoaded: true,
        },
      };
    }
    case LocalStateTypes.SET_INITIAL_COLORS_LOADED: {
      return {
        ...state,
        appData: {
          ...state.appData,
          initialColorsLoaded: true,
        },
      };
    }
    case LocalStateTypes.ENQUEUE_SNACKBAR:
      return {
        ...state,
        appData: {
          ...state.appData,
          notifications: [
            ...state.appData.notifications,
            {
              key: action.payload.key,
              ...action.payload.notification,
            },
          ],
        },
      };
    case LocalStateTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        appData: {
          ...state.appData,
          notifications: state.appData.notifications.map((notification) =>
            action.payload.dismissAll || notification.key === action.payload.key
              ? { ...notification, dismissed: true }
              : { ...notification },
          ),
        },
      };
    case LocalStateTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        appData: {
          ...state.appData,
          notifications: state.appData.notifications.filter(
            (notification) => notification.key !== action.payload,
          ),
        },
      };
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
