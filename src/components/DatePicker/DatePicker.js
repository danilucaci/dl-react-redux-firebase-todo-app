import React from "react";

import "./DatePicker.styles.scss";
import Portal from "../Portal/Portal";
import { useRectSize } from "../../hooks";
import DayPicker from "react-day-picker";
import { isPastDate } from "../../utils/dates";
import { isToday } from "date-fns";

const DatePicker = ({ dueDate, onChangeHandler, onCloseHandler, position }) => {
  const [datePickerRef, datePickerSize] = useRectSize();

  let style = {
    left: position.left,
    right: position.right,
    top: position.top,
    bottom: position.bottom,
  };

  style.left = Math.min(
    position.left,
    document.body.clientWidth - datePickerSize.width - 16,
  );

  style.right = Math.min(
    position.right,
    document.body.clientWidth - datePickerSize.width - 16,
  );

  style.bottom = Math.min(
    position.bottom,
    document.body.clientHeight - datePickerSize.bottom - 16,
  );

  function handleDateChange(date) {
    if (!isPastDate(date) || isToday(date)) {
      onChangeHandler(date);
      onCloseHandler();
    }
  }

  return (
    <Portal id="datePicker-portal">
      <div className="DatePicker__Overlay">
        <div className="DatePicker__Inner" style={style} ref={datePickerRef}>
          <DayPicker
            numberOfMonths={1}
            fromMonth={dueDate}
            onDayClick={handleDateChange}
            selectedDays={dueDate}
            disabledDays={{ before: new Date() }}
          />
        </div>
      </div>
    </Portal>
  );
};

DatePicker.propTypes = {};

export default DatePicker;
