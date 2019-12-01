import React, { memo } from "react";
import { string, instanceOf, oneOfType, bool, func } from "prop-types";
import classNames from "classnames";

import "./TodoDueDate.styles.scss";

import { getClassesFromProps } from "../../utils/helpers";
import { isPastDate } from "../../utils/dates";
import DatePicker from "../DatePicker/DatePicker";
import { useRectSize } from "../../hooks";

import FormattedTodoDueDate from "../FormattedTodoDueDate/FormattedTodoDueDate";
import AriaText from "../AriaText/AriaText";

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
        <AriaText>todo due date: </AriaText>
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
