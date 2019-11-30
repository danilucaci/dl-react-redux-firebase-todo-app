import { connect } from "react-redux";

import { liveRegionSelector } from "../../../redux/localState/localState-selectors";
import { clearLiveRegionMessage } from "../../../redux/localState/localState-actions";

import LiveRegion from "../../../components/LiveRegion/LiveRegion";

export const mapStateToProps = (state) => ({
  liveRegion: liveRegionSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  clearLiveRegionMessage: () => dispatch(clearLiveRegionMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveRegion);
