import { connect } from "react-redux";

import { userStateSelector } from "../../../redux/user/user-selectors";
import {
  loginUser,
  setLoginErrors,
  clearLoginError,
} from "../../../redux/user/user-actions";

import Login from "../../../pages/Login/Login";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  setLoginErrors: (errors) => dispatch(setLoginErrors(errors)),
  clearLoginError: () => dispatch(clearLoginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
