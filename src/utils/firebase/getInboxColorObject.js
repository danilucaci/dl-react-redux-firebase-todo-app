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
 * @returns {Object|{}} Transformed object to store in redux.
 */
function getDocsObject(docs = []) {
  const obj = docs.reduce(function reduceDocs(docs, currDoc) {
    return {
      ...docs,
      [currDoc.id]: { id: currDoc.id, ...currDoc.data() },
    };
  }, {});

  return obj;
}

export default getDocsObject;
