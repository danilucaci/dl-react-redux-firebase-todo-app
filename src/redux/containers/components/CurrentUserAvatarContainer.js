import { connect } from "react-redux";
import { currentUserSelector } from "../../user/user-selectors";

import CurrentUserAvatar from "../../../components/CurrentUserAvatar/CurrentUserAvatar";
import { logoutUser } from "../../user/user-actions";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserAvatar);
