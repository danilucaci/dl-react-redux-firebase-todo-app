export function getClassesnamesObject(additionalClasses = []) {
  return additionalClasses.reduce(
    (classes, currClass) => ({
      ...classes,
      [currClass]: true,
    }),
    {},
  );
}

export function getClassesFromProps(additionalClasses) {
  if (additionalClasses === null || additionalClasses === undefined) {
    return null;
  }

  // Class,Class,Class
  if (typeof additionalClasses === "string") {
    const trimmedClasses = additionalClasses.trim();

    if (trimmedClasses.includes(",")) {
      return getClassesnamesObject(
        Array.from(
          trimmedClasses.split(",").map((str) => {
            return str.trim();
          }),
        ),
      );
    }

    // Class Class Class
    if (trimmedClasses.length > 0 && trimmedClasses.includes(" ")) {
      return getClassesnamesObject(
        Array.from(
          trimmedClasses.split(" ").map((str) => {
            return str.trim();
          }),
        ),
      );
    }

    // Class
    if (trimmedClasses.length > 0) {
      return getClassesnamesObject(
        trimmedClasses.split(" ").map((str) => {
          return str.trim();
        }),
      );
    }
  }

  console.error(
    `Invalid additionalClasses received in getClassesFromProps: ${additionalClasses}`,
  );
  return null;
}

/**
 * Check if the object is empty
 *
 * @param {Object} obj - An object to check if it is empty or not.
 * @returns `true` if the object is empty.
 *
 * @link https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
 */
export function isEmptyObj(obj = {}) {
  // because Object.entries(new Date()).length === 0;
  // we have to do some additional check
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/**
 * Takes in many arguments and filters out falsy values
 * @param {?...any} errors
 * @returns {[string]} Array of errors as strings
 */
export function filterErrors(...errors) {
  return filterStrings(errors).filter(Boolean);
}

export function filterStrings(strings) {
  return strings.filter((str) => typeof str === "string");
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
