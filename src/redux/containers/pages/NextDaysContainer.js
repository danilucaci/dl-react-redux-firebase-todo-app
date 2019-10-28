import { connect } from "react-redux";

import {
  overdueTodosSelector,
  todayTodosSelector,
  nextDaysPlus1TodosSelector,
  nextDaysPlus2TodosSelector,
  nextDaysPlus3TodosSelector,
  nextDaysPlus4TodosSelector,
  nextDaysPlus5TodosSelector,
  nextDaysPlus6TodosSelector,
} from "../../../redux/todos/todos-selectors";

import NextDays from "../../../pages/NextDays/NextDays";

const mapStateToProps = (state) => ({
  overdueTodos: overdueTodosSelector(state),
  todayTodos: todayTodosSelector(state),
  nextDaysPlus1Todos: nextDaysPlus1TodosSelector(state),
  nextDaysPlus2Todos: nextDaysPlus2TodosSelector(state),
  nextDaysPlus3Todos: nextDaysPlus3TodosSelector(state),
  nextDaysPlus4Todos: nextDaysPlus4TodosSelector(state),
  nextDaysPlus5Todos: nextDaysPlus5TodosSelector(state),
  nextDaysPlus6Todos: nextDaysPlus6TodosSelector(state),
});

export default connect(mapStateToProps)(NextDays);
