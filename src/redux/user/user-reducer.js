import UserTypes from "./user-types";
// import ADMIN from "./test-user";

export const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  isLoggingIn: false,
  loginErrors: [],
  isSigningUp: false,
  signupLoading: false,
  signupErrors: [],
  isLoggingOut: false,
  logoutErrors: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        loginErrors: [],
      };
    }
    case UserTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        currentUser: action.payload,
        loginErrors: [],
      };
    }
    case UserTypes.LOGIN_ERRORS: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginErrors: [...state.loginErrors, action.payload],
      };
    }
    case UserTypes.SIGNUP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        signupLoading: true,
        signupErrors: [],
      };
    }
    case UserTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isAuthenticated: true,
        signupLoading: false,
        currentUser: action.payload,
        signupErrors: [],
      };
    }
    case UserTypes.SIGNUP_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        signupLoading: false,
        signupErrors: [...state.signupErrors, action.payload],
      };
    }
    case UserTypes.LOGOUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
        logoutErrors: [],
      };
    }
    case UserTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        currentUser: null,
      };
    }
    case UserTypes.LOGOUT_ERROR: {
      return {
        ...state,
        isLoggingOut: false,
        logoutErrors: [...state.logoutErrors, action.payload],
      };
    }
    default:
      return state;
  }
};

export default userReducer;
