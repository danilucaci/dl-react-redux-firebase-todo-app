import { useEffect, useState, useRef } from "react";

function useAnimation(showElement, delay = 66) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutID = useRef(null);

  useEffect(() => {
    /**
     * 1. Get visibility state from redux
     * 2. Add `isTransitioning` class that sets `display: block;`
     * 3. Add `isVisible` class with the transition css properties
     * 4. When the visibility state from redux is `false`,
     *    remove the `isVisible` class to transition back to the previous state
     * 5. Call `setTimeout` to remove the `isTransitioning` class and set `display: none;`
     *
     * on open: first add `display: block` then `transition`
     * on close: first `transition` then add `display: none`
     */

    if (showElement) {
      setIsTransitioning(true);
      timeoutID.current = setTimeout(() => setIsVisible(true), delay);
    }

    if (!showElement && isVisible) {
      setIsVisible(false);
      timeoutID.current = setTimeout(() => setIsTransitioning(false), delay);
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID);
      }
    };
  }, [isVisible, showElement, delay]);

  return [isVisible, isTransitioning];
}

export default useAnimation;
