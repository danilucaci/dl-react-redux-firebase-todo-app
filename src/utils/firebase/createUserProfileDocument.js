import { firestore } from "../../firebase/firebase";
import * as COLLECTIONS from "../../constants/collections";
import { isEmptyObj } from "../helpers";

/**
 * Creates a new user document in firestore when the user is logged in.
 *
 * 1. Checks if the user already exists.
 * 2. If it doesn’t, it creates a new user with a default project.
 * 3. If it already exists, return the userRef from firestore and any errors that were caught.
 *
 * @param {Object} user The current signed in user.
 * @param {Object} additionalData Other props to store on the user document.
 *
 * @returns `firebase documentRef`
 * @returns {?array} `Array` of errors caught.
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
        ...additionalData,
      });

      /**
       * 4. Add an initial `Inbox` project document in the user’s `projects` sub-collection.
       * `Inbox` is the default project each user has when they sign up.
       */
      await createDefaultUserProject(user.uid);
    } catch (errorMessage) {
      return Promise.reject(errorMessage);
    }
  }

  /**
   * 5. Return the new user’s `uid` and null for the errors.
   */
  return userRef;
}

/**
 * Get the `userRef` of the provided `uid`
 *
 * @param {string} uid The user uid from firestore.
 *
 * @returns Firestore `DocumentReference` of the user or the `errorMessage` that was caught.
 */
export async function getUserDocumentRef(uid = null) {
  if (!uid) {
    return Promise.reject("No user id provided in `getUserDocumentRef()`");
  }

  return firestore.collection(COLLECTIONS.USERS).doc(uid);
}

/**
 * Create the default project for each user when they sign up.
 *
 * @param {Object} userID The current signed in user.
 * @returns {null} `null` If the project was set correctly or an error message.
 */
export async function createDefaultUserProject(userID = null) {
  if (!userID) {
    return Promise.reject("No user id provided");
  }

  /**
   * https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
   *
   * In some cases, it can be useful to create a document reference
   * with an auto-generated ID, then use the reference later.
   * For this use case, you can call `doc()`.
   *
   * 1. Get a ref to a new project document in the users’ `projects` sub-collection
   * (projects are stored as sub-collections of each user: `user/project/project-name`)
   */
  const inboxProjectRef = firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.PROJECTS)
    .doc();

  /**
   * 2. Get the color data for the `Inbox` project type from firebase
   * @example
   * colorData = {
   *   colorID: "color-id",
   *   colorName: "Inbox",
   *   colorValue: "#hex-value",
   * }
   */
  const inboxColorResult = await getInboxColor().catch((errorMessage) => {
    return Promise.reject(errorMessage);
  });

  /**
   * 3. Add a new `project` document with the id from the previous generated `inboxProjectRef`.
   *
   * Add an initial `Inbox` project document in the user’s `projects` sub-collection.
   * `Inbox` is the default project each user has when they sign up.
   */
  const newInboxProject = {
    uid: userID,
    name: COLLECTIONS.DEFAULT_USER_PROJECT_NAME,
    [COLLECTIONS.INBOX_PROJECT_IDENTIFIER]: true,
    todosCount: 0,
    color: inboxColorResult,
  };

  await inboxProjectRef
    .set({
      ...newInboxProject,
    })
    .catch((error) => {
      return Promise.reject(error.message);
    });
}

/**
 * Get the color info of the default user project.
 * When a new user signs up we need to create a default project.
 *
 * @returns {Object} `colorData` Object with the color data of the default project.
 * @returns {string} `error` String with the error caught from firestore.
 * @returns {null} `null` If no data was found.
 * @example
 *
 * Object with the color info from firebase
 * colorData = {
 *   colorID: "color-id",
 *   colorName: "Inbox",
 *   colorValue: "#hex-value",
 * }
 */
export async function getInboxColor() {
  try {
    const colorSnapshot = await firestore
      .collection(COLLECTIONS.COLORS)
      .where(COLLECTIONS.INBOX_COLOR_IDENTIFIER, "==", true)
      .limit(40)
      .get()
      .catch((e) => {
        return Promise.reject(e.message);
      });

    // If it is not empty return the color data of the default project
    if (!colorSnapshot.empty) {
      if (colorSnapshot.docs && colorSnapshot.docs[0].exists) {
        return {
          colorID: colorSnapshot.docs[0].id,
          colorName: colorSnapshot.docs[0].data().colorName,
          colorValue: colorSnapshot.docs[0].data().colorValue,
        };
      }

      return Promise.reject("Failed to get the default project color data.");
    }

    // If the snapshot was empty return null
    return Promise.reject("Failed to get the default project color data.");
  } catch (e) {
    return Promise.reject(e.message);
  }
}
