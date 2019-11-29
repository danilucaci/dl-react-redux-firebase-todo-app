import React, { useState } from "react";
import { object, oneOfType, instanceOf, bool, string, func } from "prop-types";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import ReactModal from "react-modal";

import "./DatePicker.styles.scss";

import TextButton from "../TextButton/TextButton";
import { useRectSize } from "../../hooks";
import {
  isPastDate,
  addTimeToDate,
  restoreDateTime,
  getTimeStringFromDate,
} from "../../utils/dates";
import { isToday } from "date-fns";
import TimeInput from "../TimeInput/TimeInput";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import AddTime from "../AddTime/AddTime";

ReactModal.setAppElement("#root");

const DatePicker = ({
  dueDate,
  onChangeHandler,
  isVisible,
  hadPreviousTime,
  hasNewTime,
  setHasNewTime,
  toggleVisibility,
  bottomFixed,
  position,
}) => {
  const [datePickerRef, datePickerSize] = useRectSize();
  const [message, setMessage] = useState(null);

  // If the todo had a `withTime` prop,
  // render the TimeInput with the time from the previous `dueDate`
  const [showTimeInput, setShowTimeInput] = useState(hasNewTime);
  // Get the time from the previous `dueDate` on the initial render
  const [selectedTime, setSelectedTime] = useState(
    hasNewTime ? getTimeStringFromDate(dueDate) : "",
  );

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
      // Restore the time of the previous date.
      if (hadPreviousTime) {
        // DayPicker adds a default 12:00PM time on each date selected
        // This restores the previous hours and minutes of the date
        // If it had a `withTime` prop set to `true`
        const dateWithRestoredTime = restoreDateTime(dueDate, date);

        // If it didn’t fail to restore the time of the previous date.
        if (dateWithRestoredTime) {
          onChangeHandler(dateWithRestoredTime);
        }
      } else {
        // If it didn’t have a `withTime` prop, set the new date as usual
        onChangeHandler(date);
      }
      if (message) {
        setMessage(null);
      }
    }
  }

  function handleTimeChange(event) {
    setSelectedTime(event.target.value);
  }

  function handleSave() {
    // If the time input has a value which is not the default `""`
    if (selectedTime) {
      // Add the hours and minutes to the current `dueDate`
      const newDate = addTimeToDate(dueDate, selectedTime);

      // If it didn’t fail to add the hours and minutes
      // Return the new date and set the `withTime` prop to true
      if (newDate) {
        // Set the new date and the `withTime` prop to true
        onChangeHandler(newDate);
        setHasNewTime(true);
      }
    } else {
      onChangeHandler(dueDate);
    }
  }

  function clearTime() {
    setSelectedTime("");

    // Set the `withTime` prop of the todo to false,
    // to indicate that it doesn’t have a time value
    setShowTimeInput(false);
    setHasNewTime(false);
  }

  return (
    <ReactModal
      isOpen={isVisible}
      contentLabel="Add a due date"
      onRequestClose={toggleVisibility}
      /**
       * `shouldCloseOnEsc={false}`
       * Avoids closing both the parent modal and this current modal when pressing `Escape`
       * Closing this modal on `Escape` key press is handled by the parent
       */
      shouldCloseOnEsc={false}
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
        firstDayOfWeek={1}
      />
      {message && <div className="DatePicker__ErrorMessage">{message}</div>}
      <div className="DatePicker__TimeInputRow">
        {showTimeInput ? (
          <>
            Time:
            <TimeInput
              initialValue={selectedTime}
              setTime={handleTimeChange}
              additionalClasses="DatePicker__TimeInput"
              name="time-input"
              aria-label="Edit the todo’s time due date."
            />
            <OutlinedButton
              size="s"
              icon="close"
              iconOnly
              onClick={clearTime}
              type="button"
              ariaText="Remove time"
            />
          </>
        ) : (
          <AddTime onClick={() => setShowTimeInput(!showTimeInput)}>
            Add time
          </AddTime>
        )}
      </div>
      <div className="DatePicker__ButtonsRow">
        <TextButton size="s" onClick={handleSave} type="button">
          Save
        </TextButton>
        <TextButton size="s" onClick={toggleVisibility} type="button">
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
  hadPreviousTime: bool,
  hasNewTime: bool.isRequired,
  setHasNewTime: func.isRequired,
  toggleVisibility: func.isRequired,
  onChangeHandler: func.isRequired,
};

DatePicker.defaultProps = {
  bottomFixed: false,
  dueDate: null,
  hadPreviousTime: null,
};

export default DatePicker;
