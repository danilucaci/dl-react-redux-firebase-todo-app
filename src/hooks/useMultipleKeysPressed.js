import { useState, useEffect } from "react";

// @use
// const [keysPressed, areAllKeysPressed] = useMultipleKeysPressed([
//   "Meta",
//   "Control",
// ]);

function useMultipleKeysPressed(targetKeys = []) {
  const [keysPressed, setKeysPressed] = useState(new Set([]));
  const [allKeysPressed, setAllKeysPressed] = useState(false);

  useEffect(() => {
    function areKeysPressed(targetKeys = [], keysPressed = []) {
      const required = new Set(targetKeys);
      for (var elem of keysPressed) {
        required.delete(elem);
      }

      if (required.size === 0) {
        setAllKeysPressed(true);
      } else {
        setAllKeysPressed(false);
      }
    }

    function keyDownHandler({ key }) {
      setKeysPressed(keysPressed.add(key));
      areKeysPressed(targetKeys, keysPressed);
    }

    function keyUpHandler({ key }) {
      keysPressed.delete(key);
      setKeysPressed(keysPressed);
      areKeysPressed(targetKeys, keysPressed);
    }

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [keysPressed, targetKeys]);

  return [keysPressed, allKeysPressed];
}

export default useMultipleKeysPressed;
