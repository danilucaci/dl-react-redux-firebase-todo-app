import { connect } from "react-redux";

import { labelsSelector } from "../../../redux/labels/labels-selectors";
import { openAddLabelModal } from "../../../redux/localState/localState-actions";

import Labels from "../../../pages/Labels/Labels";

export const mapStateToProps = (state) => ({
  labels: labelsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddLabelModal: () => dispatch(openAddLabelModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Labels);
