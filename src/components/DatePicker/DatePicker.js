import React, { useState } from "react";
import { object, oneOfType, instanceOf, bool, string, func } from "prop-types";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./DatePicker.styles.scss";

import Portal from "../Portal/Portal";
import TextButton from "../TextButton/TextButton";
import { useRectSize } from "../../hooks";
import { isPastDate } from "../../utils/dates";
import { isToday } from "date-fns";

const DatePicker = ({
  dueDate,
  onChangeHandler,
  onCloseHandler,
  bottomFixed,
  position,
}) => {
  const [datePickerRef, datePickerSize] = useRectSize();
  const [message, setMessage] = useState(null);

  let style = {
    left: position.right - datePickerSize.width,
    top: position.bottom,
  };

  if (position.right - datePickerSize.width < 16) {
    style.left = 16;
  }

  if (
    bottomFixed &&
    position.bottom + datePickerSize.height > window.innerHeight
  ) {
    style.top =
      position.bottom -
      8 -
      (position.bottom + datePickerSize.height - window.innerHeight);
  }

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

DatePicker.propTypes = {
  dueDate: oneOfType([instanceOf(Date), string]),
  position: object.isRequired,
  bottomFixed: bool,
  onChangeHandler: func.isRequired,
  onCloseHandler: func.isRequired,
};

DatePicker.defaultProps = {
  bottomFixed: false,
  dueDate: null,
};

export default DatePicker;
