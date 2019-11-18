import { connect } from "react-redux";

import {
  makeLabelOverdueTodosSelector,
  makeLabelNotOverdueTodosSelector,
  makeLabelSelector,
} from "../../../redux/labels/labels-selectors";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Label from "../../../pages/Label/Label";

const makeMapStateToProps = () => {
  const labelOverdueTodosSelector = makeLabelOverdueTodosSelector();
  const labelNotOverdueTodosSelector = makeLabelNotOverdueTodosSelector();
  const labelSelector = makeLabelSelector();

  return (state, ownProps) => ({
    labelOverdueTodos: labelOverdueTodosSelector(state, ownProps.labelID),
    labelTodos: labelNotOverdueTodosSelector(state, ownProps.labelID),
    label: labelSelector(state, ownProps.labelID),
  });
};

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Label);
