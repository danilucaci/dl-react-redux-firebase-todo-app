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
function getTodosObjectFromDocs(docs = []) {
  return docs.reduce(function reduceDocs(docs, currDoc) {
    const data = {
      ...currDoc.data(),
    };

    const dueDate = currDoc.data().dueDate
      ? currDoc.data().dueDate.toDate()
      : null;

    return {
      ...docs,
      [currDoc.id]: {
        id: currDoc.id,
        ...data,
        dueDate,
        isHighlighted: false,
        isFocused: false,
      },
    };
  }, {});
}

export default getTodosObjectFromDocs;
