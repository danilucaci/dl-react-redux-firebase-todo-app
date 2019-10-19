import { useRef, useEffect } from "react";

// @use
// useKeyUpPress((event) => console.log(event.key));

function useKeyUpPress(targetKey = "", fn) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = fn;
  }, [fn]);

  useEffect(() => {
    function eventListener(event) {
      if (event.key === targetKey) {
        savedHandler.current(event);
      }
    }

    document.addEventListener("keyup", eventListener);
    return () => {
      document.removeEventListener("keyup", eventListener);
    };
  }, [targetKey]);
}

export default useKeyUpPress;
