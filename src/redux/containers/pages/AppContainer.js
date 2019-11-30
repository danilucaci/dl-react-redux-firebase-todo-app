import { connect } from "react-redux";

import {
  modalsSelector,
  menuSelector,
  appDataSelector,
  liveRegionSelector,
} from "../../../redux/localState/localState-selectors";
import {
  setInitialDataLoaded,
  closeMenu,
} from "../../../redux/localState/localState-actions";
import { userStateSelector } from "../../user/user-selectors";
import { notInboxProjectsSelector } from "../../../redux/projects/projects-selectors";
import { allLabelsSelector } from "../../../redux/labels/labels-selectors";
import { subscribeToColors } from "../../../redux/colors/colors-actions";
import { subscribeToTodos } from "../../../redux/todos/todos-actions";
import { subscribeToLabels } from "../../../redux/labels/labels-actions";
import { subscribeToProjects } from "../../../redux/projects/projects-actions";

import App from "../../../App";

export const mapStateToProps = (state) => ({
  modalsState: modalsSelector(state),
  menu: menuSelector(state),
  appData: appDataSelector(state),
  user: userStateSelector(state),
  projects: notInboxProjectsSelector(state),
  labels: allLabelsSelector(state),
  liveRegion: liveRegionSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
  setInitialDataLoaded: () => dispatch(setInitialDataLoaded()),
  subscribeToColors: () => dispatch(subscribeToColors()),
  subscribeToTodos: () => dispatch(subscribeToTodos()),
  subscribeToLabels: () => dispatch(subscribeToLabels()),
  subscribeToProjects: () => dispatch(subscribeToProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
