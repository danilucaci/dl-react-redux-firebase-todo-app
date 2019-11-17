import { connect } from "react-redux";

import {
  labelOverdueTodosSelector,
  labelNotOverdueTodosSelector,
  labelSelector,
} from "../../../redux/labels/labels-selectors";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Label from "../../../pages/Label/Label";

const mapStateToProps = (state, ownProps) => ({
  labelOverdueTodos: labelOverdueTodosSelector(state, ownProps.labelID),
  labelTodos: labelNotOverdueTodosSelector(state, ownProps.labelID),
  label: labelSelector(state, ownProps.labelID),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Label);
