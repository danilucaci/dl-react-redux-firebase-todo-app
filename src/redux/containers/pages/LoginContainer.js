import { connect } from "react-redux";

import { currentUserSelector } from "../../../redux/user/user-selectors";

import Login from "../../../pages/Login/Login";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export default connect(mapStateToProps)(Login);
