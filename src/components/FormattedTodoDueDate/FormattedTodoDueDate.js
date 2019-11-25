import { useLocation } from "react-router-dom";

import {
  formatTodoDueDateWithTime,
  formatTodoDueDateWithoutTime,
  formatNextDaysTodoDueDateWithTime,
  formatNextDaysTodoDueDateWithoutTime,
} from "../../utils/dates";

function FormattedTodoDueDate(dueDate, hasNewTime, fullDateFormat) {
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

export default FormattedTodoDueDate;
