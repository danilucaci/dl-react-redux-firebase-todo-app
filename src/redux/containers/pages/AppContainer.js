import { connect } from "react-redux";

import { currentUserSelector } from "../../../redux/user/user-selectors";
import { modalsSelector } from "../../../redux/localState/localState-selectors";
import { menuSelector } from "../../../redux/localState/localState-selectors";
import { closeMenu } from "../../../redux/localState/localState-actions";
import { appDataSelector } from "../../../redux/localState/localState-selectors";

import App from "../../../App";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
  modalsState: modalsSelector(state),
  menu: menuSelector(state),
  appData: appDataSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
