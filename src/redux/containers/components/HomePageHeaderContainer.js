import { connect } from "react-redux";
import { userStateSelector } from "../../user/user-selectors";

import HomePageHeader from "../../../components/HomePageHeader/HomePageHeader";

export const mapStateToProps = (state) => ({
  userState: userStateSelector(state),
});

export default connect(mapStateToProps)(HomePageHeader);
