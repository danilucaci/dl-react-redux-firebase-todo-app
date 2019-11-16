import UserTypes from "./user-types";
import { auth, signInWithGoogle, signOut } from "../../firebase/firebase";
import { createSignUpUserDocument } from "../../utils/firebase/createSignUpUserDocument";
import { resetStoreAndLogOut } from "../root-reducer";

export const loginRequest = () => ({ type: UserTypes.LOGIN_REQUEST });

export const loginSuccess = (currentUser) => ({
  type: UserTypes.LOGIN_SUCCESS,
  payload: currentUser,
});

export const setLoginErrors = (errors) => ({
  type: UserTypes.LOGIN_ERRORS,
  payload: errors,
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

export const logoutRequest = () => ({ type: UserTypes.LOGOUT_REQUEST });

export const logoutSuccess = () => ({ type: UserTypes.LOGOUT_SUCCESS });

export const setLogoutErrors = (error) => ({
  type: UserTypes.LOGOUT_ERROR,
  payload: error,
});

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginRequest());
    return auth.signInWithEmailAndPassword(email, password);
  };
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(logoutRequest());

    signOut()
      .then(() => {
        dispatch(resetStoreAndLogOut());
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        dispatch(setLogoutErrors(error.message));
      });
  };
}

export function signUpWithEmailRequest(email, password, displayName) {
  return async (dispatch) => {
    dispatch(signupRequest());

    const { user } =
      (await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          dispatch(setSignupErrors(error.message));
        })) || {};

    if (user) {
      const newUser = await createSignUpUserDocument(user, {
        displayName,
      }).catch((errorMessage) => {
        dispatch(setSignupErrors(errorMessage));
      });

      if (newUser) {
        dispatch(signupSuccess(newUser));
      } else {
        dispatch(
          setSignupErrors(
            "Something went wrong while creating your account. Please try again.",
          ),
        );
      }
    }
  };
}

export function signUpWithGoogleRequest() {
  return async (dispatch) => {
    dispatch(signupRequest());

    const { user } =
      (await signInWithGoogle().catch((error) => {
        dispatch(setSignupErrors(error.message));
      })) || {};

    if (user) {
      const newUser = await createSignUpUserDocument(user).catch(
        (errorMessage) => {
          dispatch(setSignupErrors(errorMessage));
        },
      );

      if (newUser) {
        dispatch(signupSuccess(newUser));
      } else {
        dispatch(
          setSignupErrors(
            "Something went wrong while creating your account. Please try again.",
          ),
        );
      }
    }
  };
}
