import { firestore } from "../../firebase/firebase";
import { isEmptyObj } from "../helpers";
import * as COLLECTIONS from "../../constants/collections";

import getDocsObject from "./getDocsObject";

/**
 * Add a new project in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} project - An object with the data of the new project to create.
 * @returns The document reference of the new project created.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function addUserProject(userID = null, project = null) {
  if (
    !userID ||
    !project ||
    typeof userID !== "string" ||
    isEmptyObj(project)
  ) {
    return;
  }

  let projectRef;
  let projectDoc;
  let projectData;
  let projectError;

  try {
    projectRef = await firestore
      .collection("users")
      .doc(userID)
      .collection("projects")
      .add(project);

    projectDoc = await projectRef.get();
    projectData = projectDoc.data();
  } catch (e) {
    projectError = e.message;
    console.error(e.message);
  }

  return [projectData, projectError];
}

/**
 * Add a new label in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} label - An object with the data of the new label to create.
 * @returns The document reference of the new label created.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function addUserLabel(userID = null, label = null) {
  if (!userID || !label || typeof userID !== "string" || isEmptyObj(label)) {
    return;
  }

  let labelRef;
  let labelDoc;
  let labelData;
  let labelError = null;

  try {
    labelRef = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.LABELS)
      .add(label);

    labelDoc = await labelRef.get();
    labelData = labelDoc.data();
  } catch (e) {
    labelError = e.message;
    console.error(e.message);
  }

  return [labelData, labelError];
}

/**
 * Add a new todo in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} todo - An object with the data of the new todo to create.
 * @returns The document reference of the new todo created.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function addUserTodo(userID = null, todo = null) {
  if (!userID || !todo || typeof userID !== "string" || isEmptyObj(todo)) {
    return;
  }

  let todoRef;
  let todoDoc;
  let todoData;
  let todoError;

  try {
    todoRef = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.TODOS)
      .add(todo);

    todoDoc = await todoRef.get();
    todoData = todoDoc.data();
  } catch (e) {
    todoError = e.message;
    console.error(e.message);
  }

  return [todoData, todoError];
}

/**
 * Get all the projects of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s projects.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function getUserProjects(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let projectsData;
  let projectsError;
  let projectsSnapshot;

  try {
    projectsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.PROJECTS)
      .get();

    projectsData = getDocsObject(projectsSnapshot.docs);
  } catch (e) {
    projectsError = e.message;
    console.error(e.message);
  }

  return [projectsData, projectsError];
}

/**
 * Get all the labels of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s labels.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function getUserLabels(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let labelsData;
  let labelsError;
  let labelsSnapshot;

  try {
    labelsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.LABELS)
      .get();

    labelsData = getDocsObject(labelsSnapshot.docs);
  } catch (e) {
    labelsError = e.message;
    console.error(e.message);
  }

  return [labelsData, labelsError];
}

/**
 * Get all the todos of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s todos.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function getUserTodos(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let todosData;
  let todosError;
  let todosSnapshot;

  try {
    todosSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.TODOS)
      .get();

    todosData = getDocsObject(todosSnapshot.docs);
  } catch (e) {
    todosError = e.message;
    console.error(e.message);
  }

  return [todosData, todosError];
}

/**
 * Get all the global colors of the app
 *
 * @returns List of all the global colors of the app.
 * @returns {?Error} An error returned from firestore if any.
 */
export async function getGlobalColors() {
  let colorsData;
  let colorsError;
  let colorsSnapshot;

  try {
    colorsSnapshot = await firestore
      .collection(COLLECTIONS.COLORS)
      .limit(2)
      .get();

    colorsData = getDocsObject(colorsSnapshot.docs);
  } catch (e) {
    colorsError = e.message;
    console.error(e.message);
  }

  return [colorsData, colorsError];
}
