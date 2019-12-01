import { connect } from "react-redux";

import {
  updateTodo,
  toggleTodoFocus,
} from "../../../redux/todos/todos-actions";
import { makeTodoSelector } from "../../../redux/todos/todos-selectors";

import TodoForm from "../../../components/TodoForm/TodoForm";

export const makeMapStateToProps = () => {
  const getTodo = makeTodoSelector();

  return (state, ownProps) => ({
    todo: getTodo(state, ownProps.todoID),
  });
};

export const mapDispatchToProps = (dispatch) => ({
  updateTodo: (todo) => dispatch(updateTodo(todo)),
  toggleTodoFocus: (todoID) => dispatch(toggleTodoFocus(todoID)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoForm);
