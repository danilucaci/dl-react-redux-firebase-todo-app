import { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function useDisableBodyBackground(keepVisibleNodeRef) {
  useEffect(() => {
    if (keepVisibleNodeRef.current) {
      disableBodyScroll(keepVisibleNodeRef.current, {
        reserveScrollBarGap: true,
      });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [keepVisibleNodeRef]);
}

export default useDisableBodyBackground;
