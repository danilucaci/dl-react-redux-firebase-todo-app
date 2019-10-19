import { useRef, useEffect } from "react";

// @use
// useKeyDownPress((event) => console.log(event.key));

function useKeyDownPress(targetKey = "", fn) {
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
    document.addEventListener("keydown", eventListener);
    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [targetKey]);
}

export default useKeyDownPress;
