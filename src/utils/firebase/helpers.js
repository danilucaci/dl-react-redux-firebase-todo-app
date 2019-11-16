import { firestore } from "../../firebase/firebase";
import { isEmptyObj } from "../helpers";
import * as COLLECTIONS from "../../constants/collections";
import * as COLLECTION_LIMITS from "../../constants/collectionLimits";

import getObjectFromDocs from "./getObjectFromDocs";

/**
 * Add a new project in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} project - An object with the data of the new project to create.
 * @returns A rejected Promise for any error caught.
 */
export async function addUserProject(userID = null, project = null) {
  if (
    !userID ||
    !project ||
    typeof userID !== "string" ||
    isEmptyObj(project)
  ) {
    return Promise.reject("Something went wrong while creating the project.");
  }

  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.PROJECTS)
    .add(project);
}

/**
 * Add a new label in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} label - An object with the data of the new label to create.
 * @returns A rejected Promise for any error caught.
 */
export async function addUserLabel(userID = null, label = null) {
  if (!userID || !label || typeof userID !== "string" || isEmptyObj(label)) {
    return Promise.reject("Something went wrong while creating the label.");
  }

  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.LABELS)
    .add(label);
}

/**
 * Add a new todo in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} todo - An object with the data of the new todo to create.
 * @returns A rejected Promise for any error caught.
 */
export async function addUserTodo(userID = null, todo = null) {
  if (!userID || !todo || typeof userID !== "string" || isEmptyObj(todo)) {
    return Promise.reject("Something went wrong while creating the todo.");
  }

  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.TODOS)
    .add(todo);
}

/**
 * Add a new todo in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} todoID - The id of the todo to set as completed.
 * @returns A rejected Promise for any error caught.
 */
export async function setFirebaseTodoCompleted(userID = null, todoID = null) {
  if (
    !userID ||
    !todoID ||
    typeof userID !== "string" ||
    typeof todoID !== "string"
  ) {
    return Promise.reject("Something went wrong while updating the todo.");
  }

  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.TODOS)
    .doc(todoID)
    .update({
      completed: true,
    });
}

/**
 * Add a new todo in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} todoID - The todo todo update in firebase.
 * @returns A rejected Promise for any error caught.
 */
export async function updateFirebaseTodo(userID = null, todoData = null) {
  if (
    !userID ||
    !todoData ||
    typeof userID !== "string" ||
    isEmptyObj(todoData)
  ) {
    return Promise.reject("Something went wrong while updating the todo.");
  }

  const { id, ...updates } = todoData;

  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(userID)
    .collection(COLLECTIONS.TODOS)
    .doc(id)
    .update(updates);
}

/**
 * Get all the projects of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s projects.
 * @returns A rejected Promise for any error caught.
 */
export async function getUserProjects(userID = null) {
  if (!userID || typeof userID !== "string") {
    return Promise.reject("Failed to get the projects. No user provided.");
  }

  try {
    const projectsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.PROJECTS)
      .limit(COLLECTION_LIMITS.PROJECTS)
      .get();

    if (projectsSnapshot.docs.empty) {
      return null;
    }

    return getObjectFromDocs(projectsSnapshot.docs);
  } catch (e) {
    return Promise.reject(e.message);
  }
}

/**
 * Get all the labels of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s labels.
 * @returns A rejected Promise for any error caught.
 */
export async function getUserLabels(userID = null) {
  if (!userID || typeof userID !== "string") {
    return Promise.reject("Failed to get the labels. No user provided.");
  }

  try {
    const labelsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.LABELS)
      .limit(COLLECTION_LIMITS.LABELS)
      .get();

    return getObjectFromDocs(labelsSnapshot.docs);
  } catch (e) {
    return Promise.reject(e.message);
  }
}

/**
 * Get all the todos of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s todos.
 * @returns A rejected Promise for any error caught.
 */
export async function getUserTodos(userID = null) {
  if (!userID || typeof userID !== "string") {
    return Promise.reject("Failed to get the labels. No user provided.");
  }

  try {
    const todosSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.TODOS)
      .limit(COLLECTION_LIMITS.TODOS)
      .where("completed", "==", false)
      .get();

    return getObjectFromDocs(todosSnapshot.docs);
  } catch (e) {
    return Promise.reject(e.message);
  }
}

/**
 * Get all the global colors of the app
 *
 * @returns List of all the global colors of the app.
 * @returns A rejected Promise for any error caught.
 */
export async function getGlobalColors() {
  try {
    const todosSnapshot = await firestore
      .collection(COLLECTIONS.COLORS)
      .limit(COLLECTION_LIMITS.COLORS)
      .get();

    return getObjectFromDocs(todosSnapshot.docs);
  } catch (e) {
    return Promise.reject(e.message);
  }
}
