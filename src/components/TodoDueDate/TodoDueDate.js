import React, { memo } from "react";
import { string, instanceOf, oneOfType, bool, func } from "prop-types";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import "./TodoDueDate.styles.scss";

import {
  formatTodoDueDateWithTime,
  formatTodoDueDateWithoutTime,
  formatNextDaysTodoDueDateWithTime,
  formatNextDaysTodoDueDateWithoutTime,
} from "../../utils/dates";

import { getClassesFromProps } from "../../utils/helpers";
import { isPastDate } from "../../utils/dates";
import DatePicker from "../DatePicker/DatePicker";
import { useRectSize } from "../../hooks";

export function FormattedTodoDueDate(dueDate, hasNewTime, fullDateFormat) {
  const location = useLocation();

  if (!dueDate) {
    return "Schedule";
  }

  /**
   * On the `/next-days` page render only the time of the date
   * bellow each day instead of the full date.
   *
   * @example
   * Friday 22-June
   * Todo 100
   * 15:00
   *
   * Saturday 23-June
   * Todo 200
   * 14:20
   *
   * ------------------------------------------------------------------
   * `fullDateFormat` Render the full date format when editing the todo
   * Even if it’s on the `/next-days` page
   */

  if (location.pathname.includes("next-days") && !fullDateFormat) {
    if (hasNewTime) {
      return formatNextDaysTodoDueDateWithTime(dueDate);
    } else {
      return formatNextDaysTodoDueDateWithoutTime(dueDate);
    }
  } else {
    if (hasNewTime) {
      return formatTodoDueDateWithTime(dueDate);
    } else {
      return formatTodoDueDateWithoutTime(dueDate);
    }
  }
}

function TodoDueDate({
  dueDate,
  additionalClasses,
  isVisible,
  hadPreviousTime,
  hasNewTime,
  setHasNewTime,
  fullDateFormat,
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
        {FormattedTodoDueDate(dueDate, hasNewTime, fullDateFormat)}
      </button>
      {isVisible && (
        <DatePicker
          dueDate={dueDate}
          isVisible={isVisible}
          hadPreviousTime={hadPreviousTime}
          hasNewTime={hasNewTime}
          setHasNewTime={setHasNewTime}
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
  hadPreviousTime: bool,
  hasNewTime: bool.isRequired,
  setHasNewTime: func,
  fullDateFormat: bool,
  toggleVisibility: func.isRequired,
  onChangeHandler: func,
};

TodoDueDate.defaultProps = {
  additionalClasses: null,
  dueDate: null,
  hadPreviousTime: false,
  bottomFixed: false,
  fullDateFormat: false,
  onChangeHandler: null,
  setHasNewTime: null,
};

export default memo(TodoDueDate);
