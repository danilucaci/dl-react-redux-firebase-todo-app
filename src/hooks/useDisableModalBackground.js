import { useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import {
  getFirstAndLastFocusableNode,
  getAllFocusableNodes,
} from "../utils/a11y";

/**
 *
 * @param {*} dependency
 * Used to update the focusable nodes list if an element is first `disabled`
 * and then `enabled` when is state changes.
 */

function useDisableModalBackground(keepVisibleNodeRef, dependency) {
  useEffect(() => {
    if (keepVisibleNodeRef.current) {
      disableBodyScroll(keepVisibleNodeRef.current, {
        reserveScrollBarGap: true,
      });
    }

    const [first, last] = getFirstAndLastFocusableNode(
      getAllFocusableNodes(keepVisibleNodeRef.current),
    );

    function onTabShiftKeyDown(e) {
      if (e.key === "Tab" && e.shiftKey) {
        last.focus();
        e.preventDefault();
      }
    }

    function onTabKeyDown(e) {
      if (e.key === "Tab") {
        first.focus();
        e.preventDefault();
      }
    }

    if (first && last) {
      first.addEventListener("keydown", onTabShiftKeyDown);
      last.addEventListener("keydown", onTabKeyDown);
    }

    console.log(
      ...getFirstAndLastFocusableNode(
        getAllFocusableNodes(keepVisibleNodeRef.current),
      ),
    );

    return () => {
      first.removeEventListener("keydown", onTabShiftKeyDown);
      last.removeEventListener("keydown", onTabKeyDown);
      clearAllBodyScrollLocks();
    };
  }, [keepVisibleNodeRef, dependency]);
}

export default useDisableModalBackground;
