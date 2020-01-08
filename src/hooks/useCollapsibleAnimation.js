import { useEffect, useState, useRef } from "react";

function useCollapsibleAnimation(showElement) {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutID = useRef(null);

  useEffect(() => {
    if (showElement && !isVisible) {
      setIsTransitioning(true);
      timeoutID.current = setTimeout(() => setIsVisible(true), 66);
    }

    if (!showElement && isVisible) {
      setIsVisible(false);
      timeoutID.current = setTimeout(() => setIsTransitioning(false), 66);
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID);
      }
    };
  }, [isVisible, showElement]);

  return [isVisible, isTransitioning];
}

export default useCollapsibleAnimation;
