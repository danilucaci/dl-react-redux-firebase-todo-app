import { connect } from "react-redux";

import {
  setTodoCompleted,
  toggleTodoHighlight,
  toggleTodoFocus,
} from "../../../redux/todos/todos-actions";
import { makeTodoSelector } from "../../../redux/todos/todos-selectors";

import TodoItem from "../../../components/TodoItem/TodoItem";

export const makeMapStateToProps = () => {
  const todoSelector = makeTodoSelector();

  return (state, ownProps) => ({
    todo: todoSelector(state, ownProps.todoID),
  });
};

export const mapDispatchToProps = (dispatch) => ({
  setTodoCompleted: (id) => dispatch(setTodoCompleted(id)),
  toggleTodoHighlight: (todoID) => dispatch(toggleTodoHighlight(todoID)),
  toggleTodoFocus: (todoID) => dispatch(toggleTodoFocus(todoID)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoItem);
