import { connect } from "react-redux";

import { userStateSelector } from "../../../redux/user/user-selectors";
import {
  loginUser,
  setLoginErrors,
  clearLoginError,
  clearSignupError,
} from "../../../redux/user/user-actions";

import {
  enqueueSnackbar,
  closeSnackbar,
} from "../../../redux/localState/localState-actions";

import Login from "../../../pages/Login/Login";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  setLoginErrors: (errors) => dispatch(setLoginErrors(errors)),
  clearLoginError: () => dispatch(clearLoginError()),
  clearSignupError: () => dispatch(clearSignupError()),
  enqueueSnackbar: (message, key) => dispatch(enqueueSnackbar(message, key)),
  closeSnackbar: (key) => dispatch(closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
