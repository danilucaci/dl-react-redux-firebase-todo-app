import { firestore } from "./firebase";
import { isEmptyObj } from "../utils/helpers";
import * as COLLECTIONS from "../constants/collections";

/**
 * Create an object with the shape of:
 * @example
 * {
 *   "entryID": {
 *     id: "entryID",
 *     ...otherData,
 *   }
 * }
 *
 * @param {array} docs - The `docs` array returned from `QuerySnapshot`.
 * @returns Transformed object to store in redux.
 */
export function getDocsObject(docs = []) {
  const obj = docs.reduce(function reduceDocs(docs, currDoc) {
    return {
      ...docs,
      [currDoc.id]: { id: currDoc.id, ...currDoc.data() },
    };
  }, {});

  return obj;
}

/**
 * Add a new project in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} project - An object with the data of the new project to create.
 * @returns The document reference of the new project created.
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

  try {
    projectRef = await firestore
      .collection("users")
      .doc(userID)
      .collection("projects")
      .add(project);

    projectDoc = await projectRef.get();
    projectData = projectDoc.data();
  } catch (e) {
    console.error(e.message);
  }

  return projectData;
}

/**
 * Add a new label in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} label - An object with the data of the new label to create.
 * @returns The document reference of the new label created.
 */
export async function addUserLabel(userID = null, label = null) {
  if (!userID || !label || typeof userID !== "string" || isEmptyObj(label)) {
    return;
  }

  let labelRef;
  let labelDoc;
  let labelData;

  try {
    labelRef = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.LABELS)
      .add(label);

    labelDoc = await labelRef.get();
    labelData = labelDoc.data();
  } catch (e) {
    console.error(e.message);
  }

  return labelData;
}

/**
 * Add a new todo in the `users` collection
 *
 * @param {string} userID - The `id` of the users collection.
 * @param {Object} todo - An object with the data of the new todo to create.
 * @returns The document reference of the new todo created.
 */
export async function addUserTodo(userID = null, todo = null) {
  if (!userID || !todo || typeof userID !== "string" || isEmptyObj(todo)) {
    return;
  }

  let todoRef;
  let todoDoc;
  let todoData;

  try {
    todoRef = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.TODOS)
      .add(todo);

    todoDoc = await todoRef.get();
    todoData = todoDoc.data();
  } catch (e) {
    console.error(e.message);
  }

  return todoData;
}

/**
 * Get all the projects of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s projects.
 */
export async function getUserProjects(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let projectsData;
  let projectsSnapshot;

  try {
    projectsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.PROJECTS)
      .get();

    projectsData = getDocsObject(projectsSnapshot.docs);
  } catch (e) {
    console.error(e.message);
  }

  return projectsData;
}

/**
 * Get all the labels of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s labels.
 */
export async function getUserLabels(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let labelsData;
  let labelsSnapshot;

  try {
    labelsSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.LABELS)
      .get();

    labelsData = getDocsObject(labelsSnapshot.docs);
  } catch (e) {
    console.error(e.message);
  }

  return labelsData;
}

/**
 * Get all the todos of a user
 *
 * @param {string} userID - The `id` of the users collection.
 * @returns List of the user’s todos.
 */
export async function getUserTodos(userID = null) {
  if (!userID || typeof userID !== "string") {
    return;
  }

  let todosData;
  let todosSnapshot;

  try {
    todosSnapshot = await firestore
      .collection(COLLECTIONS.USERS)
      .doc(userID)
      .collection(COLLECTIONS.TODOS)
      .get();

    todosData = getDocsObject(todosSnapshot.docs);
  } catch (e) {
    console.error(e.message);
  }

  return todosData;
}

/**
 * Get all the global colors of the app
 *
 * @returns List of all the global colors of the app.
 */
export async function getGlobalColors() {
  let colorsData;
  let colorsSnapshot;

  try {
    colorsSnapshot = await firestore
      .collection(COLLECTIONS.COLORS)
      .limit(2)
      .get();

    colorsData = getDocsObject(colorsSnapshot.docs);
  } catch (e) {
    console.error(e.message);
  }

  return colorsData;
}
