import React, { useRef, useEffect } from "react";
import { string, func, bool } from "prop-types";
import classNames from "classnames";
import InputMask from "react-input-mask";

import "./TimeInput.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

const TimeInput = ({
  additionalClasses,
  setTime,
  isVisible,
  initialValue,
  ...props
}) => {
  const addedClasses = getClassesFromProps(additionalClasses);

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when opening it
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const inputClasses = classNames({
    TimeInput: true,
    ...addedClasses,
  });

  const startsWithTwo = initialValue[0] === "2";

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  function handleTimeInputSubmit(e) {
    // Stop propagation here so it doesn’t submit the outer form
    // Either the form in the TodoForm or AddTodoModal
    e.stopPropagation();
    e.preventDefault();
  }

  // TODO: Don’t allow setting the date if the time isn’t filled out
  return (
    <form
      aria-label="Edit the todo’s time due date."
      style={{
        display: "inline-block",
      }}
      onSubmit={handleTimeInputSubmit}
    >
      <label htmlFor="time-input">Time:</label>
      <InputMask
        mask={mask}
        alwaysShowMask={true}
        maskPlaceholder="hh/mm"
        onChange={setTime}
        value={initialValue}
      >
        <input
          id="time-input"
          className={inputClasses}
          type="text"
          ref={inputRef}
          {...props}
        />
      </InputMask>
    </form>
  );
};

TimeInput.propTypes = {
  additionalClasses: string,
  setTime: func.isRequired,
  initialValue: string.isRequired,
  isVisible: bool.isRequired,
};

TimeInput.defaultProps = {
  additionalClasses: null,
};

export default TimeInput;
