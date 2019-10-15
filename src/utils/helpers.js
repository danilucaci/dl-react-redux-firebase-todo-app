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
    return [];
  }

  // Class,Class,Class
  if (typeof additionalClasses === "string") {
    if (additionalClasses.includes(",")) {
      return getClassesnamesObject(
        Array.from(
          additionalClasses.split(",").map((str) => {
            return str.trim();
          }),
        ),
      );
    }

    // Class Class Class
    if (additionalClasses.includes(" ")) {
      return getClassesnamesObject(
        Array.from(
          additionalClasses.split(" ").map((str) => {
            return str.trim();
          }),
        ),
      );
    }

    // Class
    return getClassesnamesObject(
      additionalClasses.split(" ").map((str) => {
        return str.trim();
      }),
    );
  }

  console.error(
    `Invalid additionalClasses received in getClassesFromProps: ${additionalClasses}`,
  );
  return [];
}
