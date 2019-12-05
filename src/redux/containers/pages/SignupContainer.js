import { connect } from "react-redux";

import { userStateSelector } from "../../../redux/user/user-selectors";
import {
  signUpWithEmailRequest,
  clearSignupError,
} from "../../../redux/user/user-actions";

import Signup from "../../../pages/Signup/Signup";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  signUpWithEmailRequest: (email, password, name) =>
    dispatch(signUpWithEmailRequest(email, password, name)),
  clearSignupError: () => dispatch(clearSignupError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
