import { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import { toggleTabIndex } from "../utils/a11y";

function useDisableModalBackground(modalRef) {
  useEffect(() => {
    if (modalRef.current) {
      disableBodyScroll(modalRef.current, { reserveScrollBarGap: true });
    }

    const reactRootElement = document.getElementById("root");

    toggleTabIndex("off", reactRootElement);

    return () => {
      toggleTabIndex("on", reactRootElement);
      clearAllBodyScrollLocks();
    };
  }, [modalRef]);
}

export default useDisableModalBackground;
