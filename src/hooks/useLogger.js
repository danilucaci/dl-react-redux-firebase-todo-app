import { useRef, useEffect } from "react";

/**
 * @example
 *
 * const [state, dispatch] = useLogger(
 *   useReducer(reducer, state),
 * );
 */

function useLogger([state, dispatch]) {
  const actionRef = useRef();

  const newDispatchRef = useRef((action) => {
    actionRef.current = action;
    dispatch(action);
  });

  useEffect(() => {
    const action = actionRef.current;

    if (action) {
      console.group(
        "%c useReducer Action: %c %s",
        "color: #FA2658; font-weight: 700",
        "color: #07E33A; font-weight: 700",
        action.type,
      );
      console.log(
        "%c Payload: ",
        "color: #FD01E4; font-weight: 700",
        action.payload,
      );
      console.log("%c State: ", "color: #07E33A; font-weight: 700", state);
      console.groupEnd("Dispatch");
    }
  }, [state]);

  return [state, newDispatchRef.current];
}

export default useLogger;
