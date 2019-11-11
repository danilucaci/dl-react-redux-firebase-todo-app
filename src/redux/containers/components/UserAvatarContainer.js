import { connect } from "react-redux";
import { currentUserSelector } from "../../user/user-selectors";

import UserAvatar from "../../../components/UserAvatar/UserAvatar";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export default connect(mapStateToProps)(UserAvatar);
