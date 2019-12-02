import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";
import uuid from "uuid";

export function getRandomId() {
  return uuid.v4();
}

export function getTodoIdFromName(name = "") {
  return name
    .toLowerCase()
    .split(" ")
    .join("_");
}

// https://testing-library.com/docs/example-react-redux
export function renderWithRedux(
  ui,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export function getTodoTestProject() {
  return {
    colorName: "Grape",
    colorValue: "#7F55F6",
    isInbox: false,
    name: "Test Project",
    projectID: "VhyOOaV5Mm8K2uWLySfL",
  };
}

export function getTodoTestInboxProject() {
  return {
    colorName: "Grey",
    colorValue: "#B8B8B8",
    isInbox: true,
    name: "Inbox",
    projectID: "Laz0EfBd66hDL9GTaJOl",
  };
}

export function getTodoTestSingleLabel() {
  return [
    {
      colorName: "Blue Grey",
      colorValue: "#2E3D5C",
      labelID: "tkMNygS38gUPOfv21MWY",
      name: "hate_it_all",
    },
  ];
}

export function getTodoTestLabels() {
  return [
    {
      colorName: "Violet",
      colorValue: "#A146E3",
      labelID: "i7WPjzqDczQWa6siQbmp",
      name: "even_cooler_stuff",
    },
    {
      colorName: "Violet",
      colorValue: "#A146E3",
      labelID: "HzBlhGh2t2XuKUflqJer",
      name: "coolio_label",
    },
  ];
}

/**
 * Get a todo with all the props set
 * @param {bool} withTime If the todo should render the time from the date
 * @param {bool} isHighlighted If the todo should be highlighted
 * @param {bool} isFocused If the todo should be focused
 * @param {string} name The name of the name
 */
export function getDefaultTestTodo(
  withTime = false,
  isHighlighted = false,
  isFocused = false,
  name = "Test Todo 1000",
  dueDate = null,
) {
  return {
    id: `${getTodoIdFromName(name)}`,
    uid: getRandomId(),
    name,
    completed: false,
    dueDate,
    labels: getTodoTestLabels(),
    project: getTodoTestProject(),
    withTime,
    isHighlighted,
    isFocused,
  };
}

export function getTestTodoWithFocus() {
  return {
    ...getDefaultTestTodo(),
    isFocused: true,
  };
}

export function getTestTodoWithDate() {
  return {
    ...getDefaultTestTodo(),
    dueDate: new Date(),
  };
}

export function getTestTodoWithTime() {
  return {
    ...getDefaultTestTodo(),
    dueDate: new Date(),
    withTime: true,
  };
}
