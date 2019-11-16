import { isEmptyObj } from "../helpers";

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
 * @param {array} docs - The `doc` object returned from `QuerySnapshot`.
 * @returns {Object|{}} Transformed object to store in redux.
 */
function getTodoObjectFromSingleDoc(doc = {}) {
  if (!doc || isEmptyObj(doc)) {
    return {};
  }

  const data = {
    ...doc.data(),
  };

  const dueDate = doc.data().dueDate ? doc.data().dueDate.toDate() : null;

  return {
    id: doc.id,
    ...data,
    dueDate,
  };
}

export default getTodoObjectFromSingleDoc;
