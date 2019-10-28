import { connect } from "react-redux";

import { toggleTodoCompleted } from "../../../redux/todos/todos-actions";
import { todoSelector } from "../../../redux/todos/todos-selectors";

import TodoItem from "../../../components/TodoItem/TodoItem";

export const mapStateToProps = (state, ownProps) => ({
  todo: todoSelector(state, ownProps.todoID),
});

export const mapDispatchToProps = (dispatch) => ({
  toggleTodoCompleted: (id) => dispatch(toggleTodoCompleted(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoItem);
