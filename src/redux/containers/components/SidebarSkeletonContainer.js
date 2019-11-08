import { connect } from "react-redux";
import { appDataSelector } from "../../../redux/localState/localState-selectors";

import SidebarSkeleton from "../../../components/SidebarSkeleton/SidebarSkeleton";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export default connect(mapStateToProps)(SidebarSkeleton);
