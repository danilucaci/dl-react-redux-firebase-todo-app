export function getAllFocusableTypes() {
  const focusableNodes = [
    "button:not(:disabled)",
    "[href]",
    "input",
    "select",
    "textarea",
    "[contentEditable=true]",
    "[tabindex]:not([tabindex='-1']",
  ];

  return focusableNodes.join(",");
}

export function getFirstFocusableNode(nodesList = []) {
  const { 0: first } = nodesList;
  return first;
}

export function getLastFocusableNode(nodesList = []) {
  const { length, [length - 1]: last } = nodesList;
  return last;
}

export function getFirstAndLastFocusableNode(nodesList = []) {
  const { length, 0: first, [length - 1]: last } = nodesList;
  return [first, last];
}

export function createFocusCycle(first, last) {
  if (first && last) {
    first.addEventListener("keydown", function onTabShiftKeyDown(e) {
      if (e.key === "Tab" && e.shiftKey) {
        last.focus();
        e.preventDefault();
      }
    });
    last.addEventListener("keydown", function onTabKeyDown(e) {
      if (e.key === "Tab") {
        first.focus();
        e.preventDefault();
      }
    });
  }
}

export function getAllFocusableNodes(container) {
  try {
    return [...container.querySelectorAll(getAllFocusableTypes())];
  } catch (e) {
    console.warn("Error in `getAllFocusableNodes`: ", e.message);
  }
}
