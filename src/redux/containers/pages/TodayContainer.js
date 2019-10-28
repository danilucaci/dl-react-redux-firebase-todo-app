import { connect } from "react-redux";

import {
  overdueTodosSelector,
  notOverdueTodayTodosSelector,
} from "../../../redux/todos/todos-selectors";

import Today from "../../../pages/Today/Today";

export const mapStateToProps = (state) => ({
  overdueTodos: overdueTodosSelector(state),
  todayTodos: notOverdueTodayTodosSelector(state),
});

export default connect(mapStateToProps)(Today);
