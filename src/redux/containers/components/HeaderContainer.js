import { connect } from "react-redux";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Header from "../../../components/Header/Header";

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Header);
