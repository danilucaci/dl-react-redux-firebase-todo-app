import { connect } from "react-redux";

import {
  notOverdueInboxTodosSelector,
  overdueInboxTodosSelector,
} from "../../../redux/todos/todos-selectors";

import Inbox from "../../../pages/Inbox/Inbox";

const mapStateToProps = (state) => ({
  overdueInboxTodos: overdueInboxTodosSelector(state),
  inboxTodos: notOverdueInboxTodosSelector(state),
});

export default connect(mapStateToProps)(Inbox);
