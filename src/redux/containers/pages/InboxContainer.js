import { connect } from "react-redux";

import {
  notOverdueInboxTodosSelector,
  overdueInboxTodosSelector,
} from "../../../redux/todos/todos-selectors";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Inbox from "../../../pages/Inbox/Inbox";

const mapStateToProps = (state) => ({
  overdueInboxTodos: overdueInboxTodosSelector(state),
  inboxTodos: notOverdueInboxTodosSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inbox);
