import LocalStateTypes from "./localState-types";

const INITIAL_STATE = {
  menu: {
    menuOpen: false,
    isTransitioning: false,
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
    default:
      return state;
  }
};

export default localStateReducer;
