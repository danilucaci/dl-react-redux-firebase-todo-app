import { connect } from "react-redux";
import { currentUserSelector } from "../../user/user-selectors";

import HomePageCurrentUserAvatar from "../../../components/HomePageCurrentUserAvatar/HomePageCurrentUserAvatar";
import { logoutUser } from "../../user/user-actions";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePageCurrentUserAvatar);
