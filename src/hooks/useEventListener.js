import { useRef, useEffect } from "react";

// @use
// useEventListener("focusin", (event) => console.log(event.target));

const useEventListener = (eventName, fn, element = global) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = fn;
  }, [fn]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
