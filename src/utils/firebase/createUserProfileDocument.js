import { firestore } from "../../firebase/firebase";
import * as COLLECTIONS from "../../constants/collections";
import { isEmptyObj } from "../helpers";

/**
 * Creates a new user document in firestore when the user is logged in.
 *
 * 1. Checks if the user already exists.
 * 2. If it doesn’t, it creates a new user.
 * 3. If it already exists, return the userRef from firestore.
 *
 * @param {Object} user The current signed in user.
 * @param {Object} additionalData Other props to store on the user document.
 *
 * @returns `firebase documentRef`
 */
export async function createUserProfileDocument(
  user = {},
  additionalData = {},
) {
  if (isEmptyObj(user) || !user.hasOwnProperty("email")) {
    return Promise.reject("Failed to get the user document. No user provided");
  }

  /**
   * 1. Get a reference to the place in the DB where a user profile might be.
   */
  const userRef = await getUserDocumentRef(user.uid).catch((errorMessage) => {
    return Promise.reject(errorMessage);
  });

  /**
   * 2. Go and fetch the document from that location
   */
  const snapshot = await userRef.get().catch((error) => {
    return Promise.reject(error.message);
  });

  /**
   * 3. Check if the user doesn’t exist in the DB, if not, create a new one.
   */
  if (!snapshot.exists) {
    const createdAt = new Date();
    try {
      // Empty values come in as `null` so you can’t set a default value for these
      // because default values are set only if the existing `value === undefined`.
      const { displayName, email, photoURL } = user;

      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        userDataPopulated: false,
        ...additionalData,
      });
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  }

  /**
   * 4. Return the new user ref.
   */
  return userRef;
}

/**
 * Get the `userRef` of the provided `uid`
 *
 * @param {string} uid The user uid from firestore.
 *
 * @returns Firestore `DocumentReference` of the user.
 */
export async function getUserDocumentRef(uid = null) {
  if (!uid) {
    return Promise.reject("No user id provided in `getUserDocumentRef()`");
  }

  return firestore.collection(COLLECTIONS.USERS).doc(uid);
}
