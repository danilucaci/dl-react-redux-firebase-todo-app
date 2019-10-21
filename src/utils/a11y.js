export function toggleTabIndex(type, container) {
  if (typeof type !== "string" || (type !== "off" && type !== "on")) {
    throw new Error("Invalid type argument in `toggleTabIndex`");
  }

  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [contentEditable=true], [tabindex]:not([tabindex="-1"]',
  );

  focusableElements.forEach((element) => {
    if (type === "on") {
      element.removeAttribute("tabindex");
    } else {
      element.setAttribute("tabindex", "-1");
    }
  });
}
