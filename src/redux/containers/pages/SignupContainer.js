import { connect } from "react-redux";

import { currentUserSelector } from "../../../redux/user/user-selectors";

import Signup from "../../../pages/Signup/Signup";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export default connect(mapStateToProps)(Signup);
