import { connect } from "react-redux";

import { updateTodo } from "../../../redux/todos/todos-actions";
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
});

export default connect(makeMapStateToProps, mapDispatchToProps)(TodoForm);
