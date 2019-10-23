import { useLayoutEffect, useRef, useCallback, useState } from "react";

// `getBoundingClientRect` is relative to the viewport,
//
// you can add window.scrollY (to the top field)
// and window.scrollX (to the left field) values
// to get the HTML element’s position relative to the entire webpage.
//
// node.x: Horizontal, left to right
// The `x` coordinate of the DOMRect's origin
// Note: avoid using it and prefer `left`
//
// node.y: Vertical, top to bottom
// The `y` coordinate of the DOMRect's origin
// Note: avoid using it and prefer `top`
//
// node.top:
// Top coordinate value of the DOMRect.
// (Has the same value as y, or y + height if height is negative.)
//
// node.left:
// left coordinate value of the DOMRect.
// (Has the same value as x, or x + width if width is negative.)
//
// node.right:
// Right coordinate value of the DOMRect.
// (Has the same value as x + width, or x if width is negative.)
//
// node.bottom:
// bottom coordinate value of the DOMRect.
// (Has the same value as y + height, or y if height is negative.)
//
// node.height: Height of the `DOMRect`
// node.width: Width of the `DOMRect`

function getRectSize(node = null) {
  if (node === null) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }

  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
  };
}

function useRectSize() {
  const [rectSize, setRectSize] = useState(getRectSize);
  const [nodeRef, setNode] = useState(null);
  const firstRender = useRef(null);

  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  //
  // Using a callback ref ensures that even if a child component displays
  // the measured node later (e.g. in response to a click),
  // we still get notified about it in the parent component and can update the measurements.
  // Note that we pass [] as a dependency array to useCallback.
  // This ensures that our ref callback doesn’t change between the re-renders,
  // and so React won’t call it unnecessarily.
  const nodeRefCb = useCallback((nodeRef) => {
    if (nodeRef) {
      setNode(nodeRef);
    }
  }, []);

  useLayoutEffect(() => {
    function eventListener() {
      firstRender.current = window.requestAnimationFrame(
        function eventListenerCb() {
          return setRectSize(getRectSize(nodeRef));
        },
      );
    }

    if (nodeRef && !firstRender.current) {
      eventListener();
    }

    if (nodeRef) {
      window.addEventListener("resize", eventListener);
      window.addEventListener("scroll", eventListener);
    }

    return () => {
      window.cancelAnimationFrame(firstRender.current);
      window.removeEventListener("resize", eventListener);
      window.removeEventListener("scroll", eventListener);
    };
  }, [nodeRefCb, rectSize, nodeRef]);

  return [nodeRefCb, rectSize, nodeRef];
}

export default useRectSize;
