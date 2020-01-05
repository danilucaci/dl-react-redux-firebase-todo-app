import { useState, useEffect } from "react";

function getStorageItem(key) {
  const value = sessionStorage.getItem(key);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

function setStorageItem(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * Stores a `key: value` pair in sessionStorage
 *
 * @param {string} key The key of the value to store
 * @param {*} initialValue The initial value
 *
 * @returns The current state and a state updater function
 * to save the new value in state and sessionStorage
 */
function useSessionStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = getStorageItem(key);

      // If no item is return, return the `initialValue`
      return item ? item : initialValue;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      return initialValue;
    }
  });

  useEffect(() => {
    setStorageItem(key, state);
  }, [state, key]);

  return [state, setState];
}

export default useSessionStorage;
