import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { auth } from "../firebase/firebase";
import getCurrentUserDataFromSnapshot from "../utils/firebase/getCurrentUserDataFromSnapshot";
import { createUserProfileDocument } from "../utils/firebase/createUserProfileDocument";
import { loginSuccess, logoutUser } from "../redux/user/user-actions";
import { userStateSelector } from "../redux/user/user-selectors";
import { getDisplayName } from "../utils/helpers";
import { enqueueErrorSnackbar } from "../redux/localState/localState-actions";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (currentUser) => dispatch(loginSuccess(currentUser)),
  enqueueErrorSnackbar: (error) => dispatch(enqueueErrorSnackbar(error)),
  logoutUser: () => dispatch(logoutUser()),
});

function withAuth(Component) {
  Component.displayName = `WithAuth(${getDisplayName(Component)})`;

  function WithAuth({
    loginSuccess,
    logoutUser,
    userState: { isSigningUp, signupErrors, isAuthenticated } = {},
    enqueueErrorSnackbar,
    ...props
  }) {
    const unsubscribeFromAuth = useRef(null);
    const unsubscribeFromUserDoc = useRef(null);

    useEffect(() => {
      function handleLogOut() {
        /**
         * First unsubscribe from the userDoc and then log out.
         * Otherwise the request on firebase will not have a `auth.uid` and throw an error.
         */
        if (unsubscribeFromUserDoc.current) {
          unsubscribeFromUserDoc.current();
        }
        logoutUser();
      }

      unsubscribeFromAuth.current = auth.onAuthStateChanged(
        async function handleAuthStateChange(user) {
          /* on sign in @returns: `user` */
          /* on sign out @returns: `null` */

          /**
           * Wait to create the profile document when signing up with email
           * to save the `displayName` first from the sign up form.
           */
          if (!isSigningUp && !signupErrors.lenght) {
            if (user) {
              await createUserProfileDocument(user)
                .then((userRef) => {
                  unsubscribeFromUserDoc.current = userRef.onSnapshot(
                    function handleUserSnapshot(snapshot) {
                      // If the user is deleted from firestore clear the local storage
                      if (snapshot.exists) {
                        loginSuccess(getCurrentUserDataFromSnapshot(snapshot));
                      } else {
                        logoutUser();
                      }
                    },
                    function handleUserSnapshotError(error) {
                      enqueueErrorSnackbar(
                        `handleUserSnapshotError: ${error.message}`,
                      );
                    },
                  );
                })
                .catch((error) => {
                  enqueueErrorSnackbar(`createUserProfileError: ${error}`);
                  handleLogOut();
                });
            } else {
              /**
               * User signed out => `user = null`
               *
               * `isAuthenticated`: Don’t log out if there was no previous user set
               */
              if (isAuthenticated) {
                handleLogOut();
              }
            }
          }
        },
        function handleAuthStateChangeError(error) {
          enqueueErrorSnackbar(`handleAuthStateChangeError: ${error.message}`);
        },
      );

      return () => {
        if (unsubscribeFromAuth.current) {
          unsubscribeFromAuth.current();
        }
        if (unsubscribeFromUserDoc.current) {
          unsubscribeFromUserDoc.current();
        }
      };
    }, [
      isSigningUp,
      loginSuccess,
      logoutUser,
      enqueueErrorSnackbar,
      signupErrors,
      isAuthenticated,
    ]);

    return <Component {...props} />;
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
}

export default withAuth;
