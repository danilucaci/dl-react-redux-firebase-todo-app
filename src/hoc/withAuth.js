import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { auth } from "../firebase/firebase";
import getGoogleAuthCurrentUserObject from "../utils/firebase/getGoogleAuthCurrentUserObject";
import { createUserProfileDocument } from "../utils/firebase/createUserProfileDocument";
import { setCurrentUser } from "../redux/user/user-actions";
import { getDisplayName } from "../utils/helpers";
import { logOut } from "../redux/root-reducer";
import { setAppDataErrors } from "../redux/localState/localState-actions";

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
  setAppDataErrors: (error) => dispatch(setAppDataErrors(error)),
  logOut: () => dispatch(logOut()),
});

function withAuth(Component) {
  Component.displayName = `WithAuth(${getDisplayName(Component)})`;

  function WithAuth({ setCurrentUser, logOut, setAppDataErrors, ...props }) {
    const unsubscribeFromAuth = useRef(null);
    const unsubscribeFromUserDoc = useRef(null);

    useEffect(() => {
      unsubscribeFromAuth.current = auth.onAuthStateChanged(
        async function handleAuthStateChange(user) {
          /* on sign in @returns: `user` */
          /* on sign out @returns: `null` */

          if (user) {
            const [userRef, userRefErrors] = await createUserProfileDocument(
              user,
            );

            unsubscribeFromUserDoc.current = userRef.onSnapshot(
              function handleUserSnapshot(snapshot) {
                // If the user is deleted from firestore clear the local storage
                if (snapshot.exists) {
                  setCurrentUser(getGoogleAuthCurrentUserObject(snapshot));
                } else logOut();
              },
              function handleUserSnapshotError(error) {
                setAppDataErrors(`handleUserSnapshotError: ${error.message}`);
              },
            );

            if (Array.isArray(userRefErrors)) {
              setAppDataErrors(...userRefErrors);
            }
          } else {
            /* User signed out => `user = null` */
            logOut();
          }
        },
        function handleAuthStateChangeError(error) {
          setAppDataErrors(`handleAuthStateChangeError: ${error.message}`);
        },
      );

      return () => {
        unsubscribeFromAuth.current();
        unsubscribeFromUserDoc.current();
      };
    }, [logOut, setAppDataErrors, setCurrentUser]);

    return <Component {...props} />;
  }

  return connect(null, mapDispatchToProps)(WithAuth);
}

export default withAuth;
