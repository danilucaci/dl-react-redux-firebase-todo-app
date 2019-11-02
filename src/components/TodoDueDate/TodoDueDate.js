import React from "react";
import { string, instanceOf, oneOfType, bool, func } from "prop-types";
import classNames from "classnames";

import "./TodoDueDate.styles.scss";

import { formatTodoDueDate } from "../../utils/dates";

import { getClassesFromProps } from "../../utils/helpers";
import { isPastDate } from "../../utils/dates";
import DatePicker from "../DatePicker/DatePicker";
import { useRectSize } from "../../hooks";

function TodoDueDate({
  dueDate,
  additionalClasses,
  isVisible,
  toggleVisibility,
  bottomFixed,
  onChangeHandler,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const [dateButtonRef, dateButtonSize] = useRectSize();

  const dueDateClassNames = classNames({
    Todo__DueDate: true,
    [`Todo__DueDate--Overdue`]: isPastDate(dueDate),
    ...addedClasses,
  });

  return (
    <>
      <button
        className={dueDateClassNames}
        type="button"
        ref={dateButtonRef}
        onClick={toggleVisibility}
        {...props}
      >
        {dueDate ? formatTodoDueDate(dueDate) : "Schedule"}
      </button>
      {isVisible && (
        <DatePicker
          dueDate={dueDate}
          isVisible={isVisible}
          toggleVisibility={toggleVisibility}
          onChangeHandler={onChangeHandler}
          bottomFixed={bottomFixed}
          position={{
            left: dateButtonSize.left || 0,
            right: dateButtonSize.right || 0,
            top: dateButtonSize.top || 0,
            bottom: dateButtonSize.bottom || 0,
          }}
        />
      )}
    </>
  );
}

TodoDueDate.propTypes = {
  dueDate: oneOfType([instanceOf(Date), string]),
  additionalClasses: string,
  bottomFixed: bool,
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  onChangeHandler: func,
};

TodoDueDate.defaultProps = {
  additionalClasses: null,
  dueDate: null,
  bottomFixed: false,
  onChangeHandler: null,
};

export default TodoDueDate;
