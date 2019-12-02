import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import TodoItem from "../TodoItem";
import {
  renderWithRedux,
  getDefaultTestTodo,
  getTestTodoWithFocus,
} from "../../../utils/tests";

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

test("Default TodoItem renders correctly", () => {
  const fakeTodo = getDefaultTestTodo();

  const toggleVisibility = jest.fn();
  const setTodoCompleted = jest.fn();
  const toggleTodoHighlight = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText, getByTestId } = renderWithRedux(
    <TodoItem
      todo={fakeTodo}
      prev={"prev_todo_id"}
      next={"next_todo_id"}
      isVisible={true}
      toggleVisibility={toggleVisibility}
      setTodoCompleted={setTodoCompleted}
      toggleTodoHighlight={toggleTodoHighlight}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  expect(getByText(fakeTodo.name)).toHaveTextContent(fakeTodo.name);
  expect(getByText(fakeTodo.project.name)).toHaveTextContent(
    fakeTodo.project.name,
  );
  expect(getByTestId("todo-item-due-date-button")).toHaveTextContent(
    /schedule/i,
  );
});

test("TodoItem focuses itself and removes focus", () => {
  const fakeTodo = getTestTodoWithFocus();

  const toggleVisibility = jest.fn();
  const setTodoCompleted = jest.fn();
  const toggleTodoHighlight = jest.fn();
  const toggleTodoFocus = jest.fn();

  const { getByText } = renderWithRedux(
    <TodoItem
      todo={fakeTodo}
      prev={"prev_todo_id"}
      next={"next_todo_id"}
      isVisible={true}
      toggleVisibility={toggleVisibility}
      setTodoCompleted={setTodoCompleted}
      toggleTodoHighlight={toggleTodoHighlight}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  expect(getByText(fakeTodo.name)).toHaveFocus();

  setTimeout(() => {
    expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
    expect(toggleTodoFocus).toHaveBeenCalledWith({
      id: fakeTodo.id,
      isFocused: false,
    });
  }, 500);

  jest.runAllTimers();
});

test("TodoItem focuses next item when completed", () => {
  const fakeTodo = getTestTodoWithFocus();

  const toggleVisibility = jest.fn();
  const setTodoCompleted = jest.fn();
  const toggleTodoHighlight = jest.fn();
  const toggleTodoFocus = jest.fn();

  const prev = "prev_todo_id";
  const next = "next_todo_id";

  const { getByTestId } = renderWithRedux(
    <TodoItem
      todo={fakeTodo}
      prev={prev}
      next={next}
      isVisible={true}
      toggleVisibility={toggleVisibility}
      setTodoCompleted={setTodoCompleted}
      toggleTodoHighlight={toggleTodoHighlight}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const todoCheckButton = getByTestId("todo-check-button");

  expect(todoCheckButton).toHaveAttribute(
    "aria-label",
    expect.stringContaining(fakeTodo.name),
  );

  userEvent.click(todoCheckButton);

  expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledWith({
    id: next,
    isFocused: true,
  });
});

test("TodoItem focuses prev item when completed without a next", () => {
  const fakeTodo = getTestTodoWithFocus();

  const toggleVisibility = jest.fn();
  const setTodoCompleted = jest.fn();
  const toggleTodoHighlight = jest.fn();
  const toggleTodoFocus = jest.fn();

  const prev = "prev_todo_id";
  const next = undefined;

  const { getByTestId } = renderWithRedux(
    <TodoItem
      todo={fakeTodo}
      prev={prev}
      next={next}
      isVisible={true}
      toggleVisibility={toggleVisibility}
      setTodoCompleted={setTodoCompleted}
      toggleTodoHighlight={toggleTodoHighlight}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const todoCheckButton = getByTestId("todo-check-button");

  userEvent.click(todoCheckButton);

  expect(todoCheckButton).toHaveAttribute(
    "aria-label",
    expect.stringContaining(fakeTodo.name),
  );

  expect(toggleTodoFocus).toHaveBeenCalledTimes(1);
  expect(toggleTodoFocus).toHaveBeenCalledWith({
    id: prev,
    isFocused: true,
  });
});

test("TodoItem toggles the TodoForm", async () => {
  const fakeTodo = getTestTodoWithFocus();

  const toggleVisibility = jest.fn();
  const setTodoCompleted = jest.fn();
  const toggleTodoHighlight = jest.fn();
  const toggleTodoFocus = jest.fn();

  const prev = "prev_todo_id";
  const next = undefined;

  const { getByText } = renderWithRedux(
    <TodoItem
      todo={fakeTodo}
      prev={prev}
      next={next}
      isVisible={true}
      toggleVisibility={toggleVisibility}
      setTodoCompleted={setTodoCompleted}
      toggleTodoHighlight={toggleTodoHighlight}
      toggleTodoFocus={toggleTodoFocus}
    />,
  );

  const todoName = getByText(fakeTodo.name);
  expect(todoName).toHaveTextContent(fakeTodo.name);
  userEvent.click(todoName);
  expect(toggleVisibility).toHaveBeenCalledTimes(1);
});
