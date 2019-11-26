import { connect } from "react-redux";

import { closeSearchModal } from "../../../redux/localState/localState-actions";
import { modalsSelector } from "../../../redux/localState/localState-selectors";

import SearchModal from "../../../components/SearchModal/SearchModal";

export const mapStateToProps = (state) => ({
  modalsState: modalsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeSearchModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
