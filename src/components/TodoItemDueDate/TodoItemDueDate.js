import React, { memo } from "react";
import { string, instanceOf, oneOfType, bool, func } from "prop-types";
import classNames from "classnames";

import "./TodoItemDueDate.styles.scss";

import FormattedTodoDueDate from "../FormattedTodoDueDate/FormattedTodoDueDate";

import { getClassesFromProps } from "../../utils/helpers";
import { isPastDate } from "../../utils/dates";

function TodoItemDueDate({
  additionalClasses,
  dueDate,
  hasNewTime,
  fullDateFormat,
  toggleVisibility,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

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
        onClick={toggleVisibility}
        {...props}
      >
        {FormattedTodoDueDate(dueDate, hasNewTime, fullDateFormat)}
      </button>
    </>
  );
}

TodoItemDueDate.propTypes = {
  additionalClasses: string,
  dueDate: oneOfType([instanceOf(Date), string]),
  hasNewTime: bool.isRequired,
  fullDateFormat: bool,
  toggleVisibility: func.isRequired,
};

TodoItemDueDate.defaultProps = {
  additionalClasses: null,
  dueDate: null,
  fullDateFormat: false,
};

export default memo(TodoItemDueDate);
