import { connect } from "react-redux";
import { removeSnackbar } from "../../../redux/localState/localState-actions";
import { appNotificationsSelector } from "../../../redux/localState/localState-selectors";

import ToastsNotifier from "../../../components/ToastsNotifier/ToastsNotifier";

const mapStateToProps = (state) => ({
  notifications: appNotificationsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  removeSnackbar: (key) => dispatch(removeSnackbar(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastsNotifier);
