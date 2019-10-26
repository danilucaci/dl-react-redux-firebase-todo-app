import { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { toggleTabIndex } from "../utils/a11y";

function useDisableModalBackground(keepVisibleNodeRef) {
  useEffect(() => {
    if (keepVisibleNodeRef.current) {
      disableBodyScroll(keepVisibleNodeRef.current, {
        reserveScrollBarGap: true,
      });
    }

    const reactRootElement = document.getElementById("root");

    toggleTabIndex("off", reactRootElement);

    return () => {
      toggleTabIndex("on", reactRootElement);
      clearAllBodyScrollLocks();
    };
  }, [keepVisibleNodeRef]);
}

export default useDisableModalBackground;
