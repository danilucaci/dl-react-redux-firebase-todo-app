import { connect } from "react-redux";

import { closeAddLabelModal } from "../../../redux/localState/localState-actions";
import { addLabel } from "../../../redux/labels/labels-actions";
import { colorsSelector } from "../../../redux/colors/colors-selectors";
import { modalsSelector } from "../../../redux/localState/localState-selectors";

import AddLabelModal from "../../../components/AddLabelModal/AddLabelModal";

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
  modalsState: modalsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeAddLabelModal()),
  addLabel: (label) => dispatch(addLabel(label)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLabelModal);
