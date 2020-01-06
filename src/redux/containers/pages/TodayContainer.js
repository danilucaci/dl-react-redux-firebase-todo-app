import { connect } from "react-redux";

import {
  overdueTodosSelector,
  todayTodosSelector,
} from "../../../redux/todos/todos-selectors";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Today from "../../../pages/Today/Today";

export const mapStateToProps = (state) => ({
  overdueTodos: overdueTodosSelector(state),
  todayTodos: todayTodosSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Today);
