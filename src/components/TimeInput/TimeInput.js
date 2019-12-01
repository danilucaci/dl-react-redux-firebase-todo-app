import React, { useEffect, useState, useCallback } from "react";
import { string, func, bool } from "prop-types";
import InputMask from "react-input-mask";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import OutlinedButton from "../OutlinedButton/OutlinedButton";

import "./TimeInput.styles.scss";

const TimeSchema = Yup.object().shape({
  time: Yup.string()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/,
      "Please enter a valid time.",
    )
    .required("Please enter a valid time."),
});

const TimeInput = ({
  showTimeInput,
  setSelectedTime,
  selectedTime,
  shouldFocusTimeInput,
  clearTime,
}) => {
  const [showInputForm, setShowInputForm] = useState(false);

  const [inputRef, setInputRef] = useState(null);
  const inputRefCb = useCallback((ref) => {
    if (ref) {
      setInputRef(ref);
    }
  }, []);

  useEffect(() => {
    // Focus the input when opening it
    if ((shouldFocusTimeInput && inputRef) || (showInputForm && inputRef)) {
      inputRef.focus();
    }
  }, [inputRef, shouldFocusTimeInput, showInputForm]);

  const [shouldFocusEditTimeButton, setShouldFocusEditTimeButton] = useState(
    false,
  );

  const [editTimeButtonRef, setEditTimeButtonRef] = useState(null);
  const editTimeButtonRefCb = useCallback((ref) => {
    if (ref) {
      setEditTimeButtonRef(ref);
    }
  }, []);

  useEffect(() => {
    // Focus the input when opening it
    if (editTimeButtonRef && shouldFocusEditTimeButton) {
      editTimeButtonRef.focus();
    }
  }, [editTimeButtonRef, shouldFocusEditTimeButton]);

  const startsWithTwo = selectedTime[0] === "2";

  const inputMask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ":",
    /[0-5]/,
    /[0-9]/,
  ];

  const renderForm = useCallback(() => {
    function handleCloseForm() {
      setShowInputForm(false);
      clearTime();
    }

    return (
      <Formik
        initialValues={{
          time: selectedTime,
        }}
        validationSchema={TimeSchema}
        onSubmit={(values) => {
          setShowInputForm(false);
          setShouldFocusEditTimeButton(true);
          setSelectedTime(values.time);
        }}
      >
        {({ handleSubmit, isValid, touched, errors }) => (
          <Form
            aria-label="Edit the todo’s time due date."
            className="TimeInput__Form"
            onSubmit={handleSubmit}
          >
            <div className="TimeInput__Form__Contents">
              <label htmlFor="time">Time: </label>
              <Field name="time">
                {({ field }) => (
                  <InputMask
                    mask={inputMask}
                    alwaysShowMask={true}
                    maskPlaceholder="hh:mm"
                    {...field}
                  >
                    <input
                      id="time"
                      className="TimeInput"
                      type="text"
                      aria-describedby="time-status"
                      ref={inputRefCb}
                    />
                  </InputMask>
                )}
              </Field>

              <OutlinedButton
                size="s"
                icon="check-24"
                iconOnly
                type="submit"
                ariaText="Save time"
                disabled={!isValid}
                additionalClasses="TimeInput__SaveTime"
              />
              <OutlinedButton
                size="s"
                icon="close"
                iconOnly
                onClick={handleCloseForm}
                type="button"
                ariaText="Cancel editing"
              />
            </div>
            {touched.time && errors.time && (
              <p
                className="TimeInput__Form__Message"
                id="time-status"
                aria-hidden="true"
              >
                {errors.time}
              </p>
            )}
          </Form>
        )}
      </Formik>
    );
  }, [clearTime, inputMask, inputRefCb, selectedTime, setSelectedTime]);

  const renderTimeButton = useCallback(() => {
    return (
      <>
        <OutlinedButton
          size="s"
          type="submit"
          aria-label={`change time, current: ${selectedTime}`}
          ref={editTimeButtonRefCb}
          onClick={() => setShowInputForm(true)}
        >
          {selectedTime}
        </OutlinedButton>

        <OutlinedButton
          size="s"
          icon="close"
          iconOnly
          type="button"
          additionalClasses="TimeInput__ClearTime"
          aria-label="Remove time"
          onClick={clearTime}
        />
      </>
    );
  }, [editTimeButtonRefCb, selectedTime, clearTime]);

  // If the `TimeInput` is visible but the `selectedTime` is empty
  // Render the form so that users can enter a time
  if (showTimeInput && !selectedTime) {
    return renderForm();
  }
  // If the `TimeInput` is visible, there is a `selectedTime`,
  // and the `showInputForm` is not `true`: render the edit time button
  if (showTimeInput && !showInputForm && selectedTime) {
    return renderTimeButton();
  }
  // If `showInputForm` is `true` and there is a `selectedTime`
  // render the form
  if (showInputForm && selectedTime) {
    return renderForm();
  }
};

TimeInput.propTypes = {
  showTimeInput: bool.isRequired,
  setSelectedTime: func.isRequired,
  selectedTime: string.isRequired,
  shouldFocusTimeInput: bool.isRequired,
  clearTime: func.isRequired,
};

export default TimeInput;
