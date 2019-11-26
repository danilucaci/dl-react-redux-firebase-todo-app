import { connect } from "react-redux";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";
import { openSearchModal } from "../../../redux/localState/localState-actions";
import { userStateSelector } from "../../user/user-selectors";

import Header from "../../../components/Header/Header";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
  openSearchModal: () => dispatch(openSearchModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
