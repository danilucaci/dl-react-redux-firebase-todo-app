import React, { useState } from "react";
import { object, oneOfType, instanceOf, bool, string, func } from "prop-types";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import ReactModal from "react-modal";

import "./DatePicker.styles.scss";

import TextButton from "../TextButton/TextButton";
import { useRectSize } from "../../hooks";
import { isPastDate } from "../../utils/dates";
import { isToday } from "date-fns";

ReactModal.setAppElement("#root");

const DatePicker = ({
  dueDate,
  onChangeHandler,
  isVisible,
  toggleVisibility,
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
      if (message) {
        setMessage(null);
      }
    }
  }

  return (
    <ReactModal
      isOpen={isVisible}
      contentLabel="Add a due date"
      onRequestClose={toggleVisibility}
      contentRef={datePickerRef}
      className="DatePicker__Inner"
      overlayClassName="DatePicker__Overlay"
      style={{
        content: {
          ...style,
        },
      }}
    >
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
          onClick={toggleVisibility}
          type="button"
        >
          Close
        </TextButton>
      </div>
    </ReactModal>
  );
};

DatePicker.propTypes = {
  dueDate: oneOfType([instanceOf(Date), string]),
  position: object.isRequired,
  bottomFixed: bool,
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  onChangeHandler: func.isRequired,
};

DatePicker.defaultProps = {
  bottomFixed: false,
  dueDate: null,
};

export default DatePicker;
