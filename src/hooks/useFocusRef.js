import { useEffect } from "react";

// @use
// useFocusRef(ref);
function useFocusRef(ref) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);
}

export default useFocusRef;
