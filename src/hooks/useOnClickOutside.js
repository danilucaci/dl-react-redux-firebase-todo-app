import { useRef, useEffect } from "react";

// @use
// function handleClickOutside(event) {
//   toggleIsEditing();
// }
// useOnClickOutside(ref, handleClickOutside);

function useOnClickOutside(ref, fn) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = fn;
  }, [fn]);

  useEffect(() => {
    function eventListener(event) {
      if (ref.current) {
        if (ref.current.contains(event.target)) {
          return;
        }
        fn(event);
      }
    }

    document.addEventListener("click", eventListener);
    return () => {
      document.removeEventListener("click", eventListener);
    };
  }, [fn, ref]);
}

export default useOnClickOutside;
