import { useEffect, useRef } from "react";
import { array, func } from "prop-types";
import { useSnackbar } from "notistack";

function storeDisplayed(arr = [], id = "") {
  return [...arr, id];
}

function removeDisplayed(arr = [], id = "") {
  return arr.filter((key) => id !== key);
}

function ToastsNotifier({ notifications = [], removeSnackbar } = {}) {
  // Keep track of the currently rendered snackbars
  const displayedRef = useRef([]);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    /**
     * `notifications`: These are coming in from redux state
     *
     * @see https://material-ui.com/api/snackbar/
     * `onClose`, `onExited` are from `@material-ui/core`
     *
     * Options provided to each snackbar
     *
     * @example
     * options: {
     *   anchorOrigin: {
     *     vertical: "top",
     *     horizontal: "right",
     *   },
     *   variant: "error",
     *   ...
     * },
     */
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        // Do nothing if snackbar is already displayed
        if (displayedRef.current.includes(key)) return;

        // Display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, key) => {
            if (options.onClose) {
              options.onClose(event, reason, key);
            }
          },
          onExited: (event, key) => {
            removeSnackbar(key);
            displayedRef.current = removeDisplayed(displayedRef.current, key);
          },
        });

        // Keep track of snackbars that we've displayed
        displayedRef.current = storeDisplayed(displayedRef.current, key);
      },
    );
  }, [closeSnackbar, enqueueSnackbar, notifications, removeSnackbar]);

  return null;
}

ToastsNotifier.propTypes = {
  notifications: array.isRequired,
  removeSnackbar: func.isRequired,
};

export default ToastsNotifier;
