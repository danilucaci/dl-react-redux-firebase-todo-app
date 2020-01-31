import UserTypes from "./user-types";
import { auth, signInWithGoogle, signOut } from "../../firebase/firebase";
import { createSignUpUserDocument } from "../../utils/firebase/createSignUpUserDocument";
import { resetStoreAndLogOut } from "../root-reducer";
import { setLiveRegionMessage } from "../localState/localState-actions";
import revertUserCreation from "../../utils/firebase/revertUserCreation";

export const loginRequest = () => ({ type: UserTypes.LOGIN_REQUEST });

export const loginSuccess = (currentUser) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: currentUser,
});

export const setLoginErrors = (errors) => ({
  type: UserTypes.LOGIN_ERRORS,
  payload: errors,
});

export const clearLoginError = () => ({
  type: UserTypes.CLEAR_LOGIN_ERROR,
});

export const signupRequest = () => ({ type: UserTypes.SIGNUP_REQUEST });

export const signupSuccess = (currentUser) => ({
  type: UserTypes.SIGNUP_SUCCESS,
  payload: currentUser,
});

export const setSignupErrors = (error) => ({
  type: UserTypes.SIGNUP_ERROR,
  payload: error,
});

export const clearSignupError = () => ({
  type: UserTypes.CLEAR_SIGNUP_ERROR,
});

export const logoutRequest = () => ({ type: UserTypes.LOGOUT_REQUEST });

export const logoutSuccess = () => ({ type: UserTypes.LOGOUT_SUCCESS });

export const setLogoutErrors = (error) => ({
  type: UserTypes.LOGOUT_ERROR,
  payload: error,
});

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginRequest());
    dispatch(setLiveRegionMessage("Logging in"));
    return auth.signInWithEmailAndPassword(email, password);
  };
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(logoutRequest());
    dispatch(setLiveRegionMessage("Signing out"));

    signOut()
      .then(() => {
        dispatch(resetStoreAndLogOut());
        dispatch(logoutSuccess());
        dispatch(setLiveRegionMessage("You have successfully signed out."));
      })
      .catch((error) => {
        dispatch(setLogoutErrors(error.message));
      });
  };
}

export function signUpWithEmailRequest({
  email,
  password,
  displayName,
  consentAccepted,
  consentValue,
}) {
  return async (dispatch) => {
    dispatch(signupRequest());
    dispatch(setLiveRegionMessage("Signing in"));

    function logoutCb() {
      return dispatch(logoutUser());
    }

    const { user } =
      (await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          dispatch(setSignupErrors(error.message));
        })) || {};

    if (user) {
      const newUser = await createSignUpUserDocument(user, {
        displayName,
        consentAccepted,
        consentValue,
      }).catch((errorMessage) => {
        revertUserCreation(user, logoutCb);
        dispatch(setSignupErrors(errorMessage));
      });

      if (newUser) {
        dispatch(signupSuccess(newUser));
      }
    }
  };
}

export function signUpWithGoogleRequest({ consentAccepted, consentValue }) {
  return async (dispatch) => {
    dispatch(signupRequest());
    dispatch(setLiveRegionMessage("Signing in with google"));

    function logoutCb() {
      return dispatch(logoutUser());
    }

    const { user } =
      (await signInWithGoogle().catch((error) => {
        dispatch(setSignupErrors(error.message));
      })) || {};

    if (user) {
      const newUser = await createSignUpUserDocument(user, {
        consentAccepted,
        consentValue,
      }).catch((errorMessage) => {
        revertUserCreation(user, logoutCb);
        dispatch(setSignupErrors(errorMessage));
      });

      if (newUser) {
        dispatch(signupSuccess(newUser));
      }
    }
  };
}
