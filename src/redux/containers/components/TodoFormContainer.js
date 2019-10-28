import { connect } from "react-redux";

import { updateTodo } from "../../../redux/todos/todos-actions";
import { todoSelector } from "../../../redux/todos/todos-selectors";

import TodoForm from "../../../components/TodoForm/TodoForm";

export const mapStateToProps = (state, ownProps) => ({
  todo: todoSelector(state, ownProps.todoID),
});

export const mapDispatchToProps = (dispatch) => ({
  updateTodo: (todo) => dispatch(updateTodo(todo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoForm);
