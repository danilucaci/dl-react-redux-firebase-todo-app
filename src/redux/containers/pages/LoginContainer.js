import { connect } from "react-redux";

import { currentUserSelector } from "../../../redux/user/user-selectors";
import { appDataSelector } from "../../../redux/localState/localState-selectors";
import { setCurrentUser } from "../../../redux/user/user-actions";

import Login from "../../../pages/Login";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
  appData: appDataSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (currentUser) => dispatch(setCurrentUser(currentUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
