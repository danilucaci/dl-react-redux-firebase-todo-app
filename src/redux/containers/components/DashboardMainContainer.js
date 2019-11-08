import { connect } from "react-redux";

import { appDataSelector } from "../../../redux/localState/localState-selectors";
import DashboardMain from "../../../components/DashboardMain/DashboardMain";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export default connect(mapStateToProps)(DashboardMain);
