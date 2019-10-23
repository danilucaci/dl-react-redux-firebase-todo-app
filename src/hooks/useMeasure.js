import { useState, useLayoutEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

function useMeasure(nodeRef = null, IsRendered) {
  const [bounds, setContentRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    let animationFrameId = null;
    let ro = null;

    if (nodeRef.current) {
      const measure = ([entry]) => {
        animationFrameId = window.requestAnimationFrame(() => {
          setContentRect(entry.contentRect);
        });
      };

      ro = new ResizeObserver(measure);

      ro.observe(nodeRef.current);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (ro) {
        ro.disconnect();
      }
    };
  }, [nodeRef, IsRendered]);

  return bounds;
}

export default useMeasure;
