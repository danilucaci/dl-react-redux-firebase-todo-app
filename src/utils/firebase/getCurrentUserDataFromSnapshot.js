import { isAdmin } from "../helpers";

/**
 * Create a user object to store in state from SignInWithGoogle.
 *
 * @param {Object} user - The `user` object from SignInWithGoogle.
 * @returns {Object} Transformed object with the `currentUser` to store in redux.
 */
function getCurrentUserDataFromSnapshot(snapshot) {
  // If the user was deleted
  if (snapshot.exists) {
    const userObj = {
      id: snapshot.id,
      displayName: snapshot.data().displayName,
      email: snapshot.data().email,
      avatar: snapshot.data().photoURL || null,
      role: isAdmin(snapshot.data().email) ? ["admin"] : null,
      userDataPopulated: snapshot.data().userDataPopulated,
    };

    return userObj;
  }

  return null;
}

export default getCurrentUserDataFromSnapshot;
