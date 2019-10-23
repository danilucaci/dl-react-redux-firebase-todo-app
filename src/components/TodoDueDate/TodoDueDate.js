import React from "react";
import { string, object } from "prop-types";
import classNames from "classnames";

import "react-day-picker/lib/style.css";
import "./DateInputPicker.styles.scss";
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
  onChangeHandler,
  onCloseHandler,
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
        {...props}
      >
        {dueDate ? formatTodoDueDate(dueDate) : "Schedule"}
      </button>
      {isVisible && (
        <DatePicker
          dueDate={dueDate}
          onChangeHandler={onChangeHandler}
          onCloseHandler={onCloseHandler}
          position={{
            left: dateButtonSize.left + window.scrollX || 0,
            right: dateButtonSize.right + window.scrollX || 0,
            top:
              dateButtonSize.top + window.scrollY + dateButtonSize.height || 0,
          }}
        />
      )}
    </>
  );
}

TodoDueDate.propTypes = {
  dueDate: object,
  additionalClasses: string,
};

TodoDueDate.defaultProps = {
  additionalClasses: null,
  dueDate: null,
};

export default TodoDueDate;
