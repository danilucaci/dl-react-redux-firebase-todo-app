import { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function useDisableSidebarBackground(keepVisibleNodeRef, condition) {
  useEffect(() => {
    if (keepVisibleNodeRef.current && condition) {
      disableBodyScroll(keepVisibleNodeRef.current, {
        reserveScrollBarGap: true,
      });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [condition, keepVisibleNodeRef]);
}

export default useDisableSidebarBackground;
