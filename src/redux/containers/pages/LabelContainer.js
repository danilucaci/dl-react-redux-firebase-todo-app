import { connect } from "react-redux";

import {
  labelOverdueTodosSelector,
  labelNotOverdueTodosSelector,
  labelSelector,
} from "../../../redux/labels/labels-selectors";

import Label from "../../../pages/Label/Label";

const mapStateToProps = (state, ownProps) => ({
  labelOverdueTodos: labelOverdueTodosSelector(state, ownProps.labelID),
  labelTodos: labelNotOverdueTodosSelector(state, ownProps.labelID),
  label: labelSelector(state, ownProps.labelID),
});

export default connect(mapStateToProps)(Label);
