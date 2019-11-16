import { connect } from "react-redux";

import { setTodoCompleted } from "../../../redux/todos/todos-actions";
import { todoSelector } from "../../../redux/todos/todos-selectors";

import TodoItem from "../../../components/TodoItem/TodoItem";

export const mapStateToProps = (state, ownProps) => ({
  todo: todoSelector(state, ownProps.todoID),
});

export const mapDispatchToProps = (dispatch) => ({
  setTodoCompleted: (id) => dispatch(setTodoCompleted(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
