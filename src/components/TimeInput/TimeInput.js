import React from "react";
import { string, func } from "prop-types";
import classNames from "classnames";
import InputMask from "react-input-mask";

import "./TimeInput.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

const TimeInput = ({ additionalClasses, setTime, initialValue, ...props }) => {
  const addedClasses = getClassesFromProps(additionalClasses);

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

  // TODO: Don’t allow setting the date if the time isn’t filled out
  return (
    <InputMask
      mask={mask}
      alwaysShowMask={true}
      maskPlaceholder="hh/mm"
      onChange={setTime}
      value={initialValue}
    >
      <input className={inputClasses} type="text" {...props} />
    </InputMask>
  );
};

TimeInput.propTypes = {
  additionalClasses: string,
  setTime: func.isRequired,
  initialValue: string.isRequired,
};

TimeInput.defaultProps = {
  additionalClasses: null,
};

export default TimeInput;
