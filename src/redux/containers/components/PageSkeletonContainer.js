import { connect } from "react-redux";
import { appDataSelector } from "../../../redux/localState/localState-selectors";

import PageSkeleton from "../../../components/PageSkeleton/PageSkeleton";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export default connect(mapStateToProps)(PageSkeleton);
