import React from "react";
import { string, object } from "prop-types";
import classNames from "classnames";

import "./TodoDueDate.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { formatTodoDueDate, isPastDate } from "../../utils/dates";

function TodoDueDate({ dueDate, additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const dueDateClassNames = classNames({
    Todo__DueDate: true,
    [`Todo__DueDate--Overdue`]: isPastDate(dueDate),
    ...addedClasses,
  });

  return (
    <button className={dueDateClassNames} type="button" {...props}>
      {dueDate ? formatTodoDueDate(dueDate) : "Schedule"}
    </button>
  );
}

TodoDueDate.propTypes = {
  dueDate: object.isRequired,
  additionalClasses: string,
};

TodoDueDate.defaultProps = {
  additionalClasses: null,
};

export default TodoDueDate;
