export function getAddedClasses(additionalClasses = []) {
  return additionalClasses.reduce(
    (classes, currClass) => ({
      ...classes,
      [currClass]: true,
    }),
    {},
  );
}
