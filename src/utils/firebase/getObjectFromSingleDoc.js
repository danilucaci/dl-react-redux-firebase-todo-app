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
function getObjectFromSingleDoc(doc = {}) {
  if (!doc || isEmptyObj(doc)) {
    return {};
  }
  return {
    id: doc.id,
    ...doc.data(),
  };
}

export default getObjectFromSingleDoc;
