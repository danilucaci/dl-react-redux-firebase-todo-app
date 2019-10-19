import { useState, useEffect } from "react";

// @use
// const isHKeyPressed = useIsKeyPressed("h"); => true || false

function useIsKeyPressed(targetKey = "") {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    function keyDownHandler({ key }) {
      if (key === targetKey) {
        setIsKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const keyUpHandler = ({ key }) => {
      if (key === targetKey) {
        setIsKeyPressed(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [targetKey]);

  return isKeyPressed;
}

export default useIsKeyPressed;
