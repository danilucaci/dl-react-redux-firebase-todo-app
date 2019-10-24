import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./DatePicker.styles.scss";

import Portal from "../Portal/Portal";
import TextButton from "../TextButton/TextButton";
import { useRectSize } from "../../hooks";
import { isPastDate } from "../../utils/dates";
import { isToday } from "date-fns";

const DatePicker = ({ dueDate, onChangeHandler, onCloseHandler, position }) => {
  const [datePickerRef, datePickerSize] = useRectSize();
  const [message, setMessage] = useState(null);

  let style = {
    left: position.left,
    right: position.right,
  };

  style.left = Math.min(
    position.left,
    document.body.clientWidth - datePickerSize.width - 16,
  );

  style.right = Math.min(
    position.right,
    document.body.clientWidth - datePickerSize.width - 16,
  );

  style.top = position.bottom;

  // if (window.innerHeight < position.bottom + datePickerSize.height) {
  //   style.top = position.bottom - datePickerSize.height - 24;
  // }

  function handleDateChange(date) {
    if (isPastDate(date) && !isToday(date)) {
      setMessage("Please select a date after today.");
    } else {
      onChangeHandler(date);
      onCloseHandler();
      if (message) {
        setMessage(null);
      }
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
          {message && <div className="DatePicker__ErrorMessage">{message}</div>}
          <div className="DatePicker__ButtonsRow">
            <TextButton
              additionalClasses="TextButton--Small"
              onClick={onCloseHandler}
              type="button"
            >
              Close
            </TextButton>
          </div>
        </div>
      </div>
    </Portal>
  );
};

DatePicker.propTypes = {};

export default DatePicker;
