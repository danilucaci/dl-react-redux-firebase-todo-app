/**
 * Create a user object to store in state from SignInWithGoogle.
 *
 * @param {Object} user - The `user` object from SignInWithGoogle.
 * @returns {Object} Transformed object with the `currentUser` to store in redux.
 */
function getGoogleAuthCurrentUserObject(snapshot) {
  // If the user was deleted
  if (snapshot.exists) {
    const userObj = {
      id: snapshot.id,
      displayName: snapshot.data().displayName,
      email: snapshot.data().email,
      avatar: snapshot.data().photoURL || null,
      role: isAdmin(snapshot.data().email) ? ["admin"] : null,
    };

    return userObj;
  }

  return null;
}

export default getGoogleAuthCurrentUserObject;

/**
 * Check if the current email is me and set the permissions to `admin`
 * @param {string} email
 */
export function isAdmin(email = "") {
  if (typeof email !== "string") return false;
  return email === process.env.REACT_APP_MY_EMAIL;
}
