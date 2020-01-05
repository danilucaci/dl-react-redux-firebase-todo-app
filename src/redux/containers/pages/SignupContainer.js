import { connect } from "react-redux";

import { userStateSelector } from "../../../redux/user/user-selectors";
import {
  signUpWithEmailRequest,
  clearSignupError,
} from "../../../redux/user/user-actions";
import {
  enqueueSnackbar,
  closeSnackbar,
} from "../../../redux/localState/localState-actions";

import Signup from "../../../pages/Signup/Signup";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  signUpWithEmailRequest: (email, password, name) =>
    dispatch(signUpWithEmailRequest(email, password, name)),
  clearSignupError: () => dispatch(clearSignupError()),
  enqueueSnackbar: (message, key) => dispatch(enqueueSnackbar(message, key)),
  closeSnackbar: (key) => dispatch(closeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
