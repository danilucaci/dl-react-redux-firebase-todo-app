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
