import { createGoogleProvider } from "../../firebase/firebase";

/**
 * If it fails to create the user doc in the firestore db,
 * rollback and delete the user. This will happen each time a user
 * that is not present in `allowed-users` collection is trying to signup.
 *
 * @param {*} user Firebase auth user object
 * @param {function} logoutCb A callback to logout the user if deleting the user fails when too much time has passed since the user logged in.
 *
 * @see https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
 */
function revertUserCreation(user, logoutCb) {
  try {
    user
      .delete()
      .then(() => {
        if (process.env.NODE_ENV === "development") {
          console.log("User Deleted.");
        }
      })
      .catch(async (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Failed to delete the user.");
          console.log(error);
        }
        /**
         * @see https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
         */
        if (
          error.hasOwnProperty("code") &&
          error.code.includes("requires-recent-login")
        ) {
          await user
            .reauthenticateWithPopup(createGoogleProvider())
            .catch((error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(error);
              }

              // Fallback
              if (typeof logoutCb === "function") {
                logoutCb();
              }
            });
        }
      });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
  }
}

export default revertUserCreation;
