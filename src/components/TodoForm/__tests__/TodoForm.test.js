import React from "react";
import ReactModal from "react-modal";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { waitForElement, fireEvent } from "@testing-library/react";

import TodoForm from "../TodoForm";
import { getDefaultTestTodo, renderWithRedux } from "../../../utils/tests";

jest.useFakeTimers();

jest.mock("@reach/utils", () => ({
  ...jest.requireActual("@reach/utils"),
  checkStyles: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  // use actual for all non-hook parts
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/next-days" }),
}));

test("Default TodoForm renders correctly", () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByLabelText, getByText } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const input = getByLabelText(/edit todo/i);
  const projectName = getByText(fakeTodo.project.name);
  const labelsName = fakeTodo.labels[0].name + ", " + fakeTodo.labels[1].name;
  const labels = getByText(labelsName);
  const dueDate = getByText("Schedule");

  expect(input.value).toBe(fakeTodo.name);
  expect(input).toHaveFocus();
  expect(projectName).toHaveTextContent(fakeTodo.project.name);
  expect(labels).toHaveTextContent(labelsName);
  expect(dueDate).toHaveTextContent("Schedule");
});

test("TodoForm items are focusable with tab", () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByLabelText, getByText } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const input = getByLabelText(/edit todo/i);
  const projectName = getByText(fakeTodo.project.name);
  const labelsName = fakeTodo.labels[0].name + ", " + fakeTodo.labels[1].name;
  const labels = getByText(labelsName);
  const dueDate = getByText("Schedule");
  const cancelButton = getByText("Cancel");
  const saveButton = getByText("Save");

  expect(input).toHaveFocus();

  userEvent.tab(input);
  expect(projectName).toHaveFocus();

  userEvent.tab(projectName);
  expect(labels).toHaveFocus();

  userEvent.tab(labels);
  expect(dueDate).toHaveFocus();

  userEvent.tab(dueDate);
  expect(cancelButton).toHaveFocus();

  userEvent.tab(cancelButton);
  expect(saveButton).toHaveFocus();
});

test("TodoForm projects can be toggled", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText, getByTestId } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const projectName = getByText(fakeTodo.project.name);
  userEvent.click(projectName);
  const projectsList = await waitForElement(() =>
    getByTestId("project-tag-list"),
  );
  expect(projectsList).toBeInTheDocument();
});

test("TodoForm labels can be toggled", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText, getByTestId } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const labelsName = fakeTodo.labels[0].name + ", " + fakeTodo.labels[1].name;
  const labels = getByText(labelsName);
  userEvent.click(labels);
  const labelsList = await waitForElement(() => getByTestId("labels-tag-list"));
  expect(labelsList).toBeInTheDocument();
});

test("TodoForm date picker can be toggled", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { container, getByText, getByTestId } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  ReactModal.setAppElement(container);

  const dueDate = getByText("Schedule");
  userEvent.click(dueDate);
  const datePickerInputs = await waitForElement(() =>
    getByTestId("date-picker-inputs"),
  );
  expect(datePickerInputs).toBeInTheDocument();
});

test("TodoForm can be closed with cancel button", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const cancelButton = getByText("Cancel");
  userEvent.click(cancelButton);

  expect(toggleVisibility).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledWith({
    id: fakeTodo.id,
    isFocused: true,
  });
});

test("TodoForm submits same values and toggles TodoItem", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText } = renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const saveButton = getByText("Save");
  userEvent.click(saveButton);

  const { isHighlighted, isFocused, ...sanitizedFakeLocalTodo } = fakeTodo;

  expect(toggleVisibility).toHaveBeenCalledTimes(1);
  expect(updateTodo).toHaveBeenCalledTimes(1);
  expect(updateTodo).toHaveBeenCalledWith({
    ...sanitizedFakeLocalTodo,
  });
});

test("TodoForm closes on body click", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  userEvent.click(document.body);
  expect(toggleVisibility).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledWith({
    id: fakeTodo.id,
    isFocused: true,
  });
});

test("TodoForm closes on escape key press", async () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const updateTodo = jest.fn();
  const toggleTodoFocus = jest.fn();

  renderWithRedux(
    <TodoForm
      todo={fakeTodo}
      updateTodo={updateTodo}
      toggleVisibility={toggleVisibility}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  fireEvent.keyUp(document.body, { key: "Escape", code: "Escape" });
  expect(toggleVisibility).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledWith({
    id: fakeTodo.id,
    isFocused: true,
  });
});
