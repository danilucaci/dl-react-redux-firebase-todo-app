import { useEffect, useState, useCallback } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

/**
 * @use
 * const componentRef = useDisableBodyBackground();
 *
 * <Component ref={componentRef} />
 */

function useDisableBodyBackground() {
  const [nodeRef, setNodeRef] = useState(null);
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  //
  // Using a callback ref ensures that even if a child component displays
  // the measured node later (e.g. in response to a click),
  // we still get notified about it in the parent component and can update the measurements.
  // Note that we pass [] as a dependency array to useCallback.
  // This ensures that our ref callback doesn’t change between the re-renders,
  // and so React won’t call it unnecessarily.
  const nodeRefCb = useCallback((refMounted) => {
    if (refMounted) {
      setNodeRef(refMounted);
    }
  }, []);

  useEffect(() => {
    if (nodeRef) {
      disableBodyScroll(nodeRef, {
        reserveScrollBarGap: true,
      });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [nodeRef]);

  return nodeRefCb;
}

export default useDisableBodyBackground;
