import { firestore } from "../../firebase/firebase";
import * as COLLECTIONS from "../../constants/collections";

/**
 * @param {Object} user The current signed in user.
 * @param {Object} additionalData Other props to store on the user document.
 */
export const createUserProfileDocument = async (
  user = null,
  additionalData = {},
) => {
  if (!user) return;

  let errors = [];

  /**
   * 1. Get a reference to the place in the DB where a user profile might be.
   */
  const userRef = firestore.doc(`${COLLECTIONS.USERS}/${user.uid}`);

  /**
   * 2. Go and fetch the document from that location
   */
  const snapshot = await userRef.get().catch((error) => {
    errors = [...errors, error.message];
  });

  /**
   * 3. If the user doesn’t exist in the DB, create a new one.
   */
  if (!snapshot.exists) {
    const createdAt = new Date();

    const {
      displayName = "Default Dani",
      email = "default@email.com",
      photoURL = null,
    } = user;

    await userRef
      .set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      })
      .catch((error) => {
        errors = [...errors, error.message];
      });

    /**
     * 4. Add an initial `Inbox` project document in the user’s `projects` sub-collection.
     * `Inbox` is the default project each user has when they sign up.
     */
    const createDefaultUserProjectErrors = await createDefaultUserProject(
      user.uid,
    );

    if (createDefaultUserProjectErrors.length) {
      errors = [...errors, ...createDefaultUserProjectErrors];
    }
  }

  const [userDocument, userDocumentError] = await getUserDocument(user.uid);

  if (userDocumentError) {
    errors = [...errors, userDocumentError];
  }

  /**
   * 5. Return the new user `uid` and any errors that happened, if any.
   */

  return [userDocument, errors];
};

/**
 * Get the `userRef` of the provided `uid`
 *
 * @param {string} uid The user uid from firestore.
 * @param {?array} errors Optional errors array to keep track of any errors that occur.
 * @returns {DocumentReference} The Firestore `DocumentReference` of the user.
 */
export async function getUserDocument(uid = null) {
  if (!uid) return [null, "No user id provided in `getUserDocument()`"];

  try {
    return [firestore.collection(COLLECTIONS.USERS).doc(uid), null];
  } catch (error) {
    return [null, error.message];
  }
}

/**
 * @param {Object} userID The current signed in user.
 * @returns {array} Errors caught while creating the user’s default project.
 */
export async function createDefaultUserProject(userID = null) {
  if (!userID) return ["No user id provided in `createDefaultUserProject()`"];

  let errors = [];

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
  const inboxProjectRef = await firestore
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
  const [inboxColorData, inboxColorError] = await getInboxColor();

  if (inboxColorError) {
    errors = [...errors, inboxColorError];
  }

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
    color: {
      ...inboxColorData,
    },
  };

  await inboxProjectRef
    .set({
      ...newInboxProject,
    })
    .catch((error) => {
      errors = [...errors, error.message];
    });

  return errors;
}

/**
 * Get the color info of the default user project.
 * When a new user signs up we need to create a default project.
 *
 * @returns {Object} The color values of the default project
 * @returns {?Error} Any errors caught from firestore.
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
  let colorData;
  let colorError;
  let colorSnapshot;

  try {
    colorSnapshot = await firestore
      .collection(COLLECTIONS.COLORS)
      .where(COLLECTIONS.INBOX_COLOR_IDENTIFIER, "==", true)
      .get();

    if (!colorSnapshot.empty) {
      colorData = {
        colorID: colorSnapshot.docs[0].id,
        colorName: colorSnapshot.docs[0].data().colorName,
        colorValue: colorSnapshot.docs[0].data().colorValue,
      };
    }
  } catch (e) {
    colorError = e.message;
  }

  return [colorData, colorError];
}
