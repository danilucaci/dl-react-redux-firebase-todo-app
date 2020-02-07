import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, waitForElement } from "@testing-library/react";
import TimeInput from "../TimeInput";

test("TimeInput is open with focus and an empty time value", () => {
  const setSelectedTime = jest.fn();
  const clearTime = jest.fn();

  const { getByLabelText } = render(
    <TimeInput
      showTimeInput={true}
      selectedTime=""
      setSelectedTime={setSelectedTime}
      shouldFocusTimeInput={true}
      clearTime={clearTime}
    />,
  );

  const timeInput = getByLabelText(/time:/i);
  expect(timeInput).toHaveValue("hh:mm");
  expect(timeInput).toHaveFocus();
});

test("TimeInput displays an error message when empty and not focused", async () => {
  const setSelectedTime = jest.fn();
  const clearTime = jest.fn();

  const { getByLabelText, getByTestId } = render(
    <TimeInput
      showTimeInput={true}
      selectedTime=""
      setSelectedTime={setSelectedTime}
      shouldFocusTimeInput={true}
      clearTime={clearTime}
    />,
  );

  const timeInput = getByLabelText(/time:/i);
  const saveButton = getByTestId("save-button");

  userEvent.tab(timeInput);
  expect(timeInput).not.toHaveFocus();

  const errorMessage = await waitForElement(() =>
    getByTestId("time-input-error-message"),
  );

  expect(saveButton).toBeDisabled();
  expect(errorMessage).toHaveTextContent(/please enter/i);
});

test("TimeInput displays time value", async () => {
  const setSelectedTime = jest.fn();
  const clearTime = jest.fn();
  const timeValue = "15:55";

  const { queryByLabelText, getByText } = render(
    <TimeInput
      showTimeInput={true}
      selectedTime={timeValue}
      setSelectedTime={setSelectedTime}
      shouldFocusTimeInput={true}
      clearTime={clearTime}
    />,
  );

  const timeInput = queryByLabelText(/time:/i);
  const timeButton = getByText(timeValue);

  expect(timeInput).toBe(null);
  expect(timeButton).toHaveTextContent(timeValue);
});

test("TimeInput with a time value toggles the form and keeps focus", async () => {
  const setSelectedTime = jest.fn();
  const clearTime = jest.fn();
  const timeValue = "15:55";

  const { queryByLabelText, getByText, queryByTestId, getByTestId } = render(
    <TimeInput
      showTimeInput={true}
      selectedTime={timeValue}
      setSelectedTime={setSelectedTime}
      shouldFocusTimeInput={true}
      clearTime={clearTime}
    />,
  );

  const timeInput = queryByLabelText(/time:/i);
  const timeButton = getByText(timeValue);

  expect(timeInput).toBe(null);
  expect(timeButton).toHaveTextContent(timeValue);

  userEvent.click(timeButton);

  const toggledTimeInput = await waitForElement(() =>
    queryByLabelText(/time:/i),
  );
  expect(toggledTimeInput).toHaveValue(timeValue);
  expect(toggledTimeInput).toHaveFocus();

  const saveButton = getByTestId("save-button");
  userEvent.click(saveButton);

  const toggledTimeButton = await waitForElement(() =>
    queryByTestId("time-button"),
  );

  expect(toggledTimeButton).toHaveTextContent(timeValue);
  expect(toggledTimeButton).toHaveFocus();
});

test("TimeInput clear button removes the time", () => {
  const setSelectedTime = jest.fn();
  const clearTime = jest.fn();
  const timeValue = "15:55";

  const { getByText, getByTestId } = render(
    <TimeInput
      showTimeInput={true}
      selectedTime={timeValue}
      setSelectedTime={setSelectedTime}
      shouldFocusTimeInput={true}
      clearTime={clearTime}
    />,
  );

  const timeButton = getByText(timeValue);
  const clearTimeButton = getByTestId("clear-time-button");
  expect(timeButton).toHaveTextContent(timeValue);

  userEvent.click(clearTimeButton);
  expect(clearTime).toHaveBeenCalledTimes(1);
});
