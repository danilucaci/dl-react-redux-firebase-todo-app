import { connect } from "react-redux";

import {
  inboxTodosCountSelector,
  todayTodosCountSelector,
  nextDaysTodosCountSelector,
} from "../../../redux/todos/todos-selectors";
import { notInboxProjectIdsSelector } from "../../../redux/projects/projects-selectors";
import { labelIdsSelector } from "../../../redux/labels/labels-selectors";
import { menuSelector } from "../../../redux/localState/localState-selectors";
import { closeMenu } from "../../../redux/localState/localState-actions";
import {
  openAddLabelModal,
  openAddProjectModal,
} from "../../../redux/localState/localState-actions";
import { appDataSelector } from "../../../redux/localState/localState-selectors";
import { logoutUser } from "../../user/user-actions";

import Sidebar from "../../../components/Sidebar/Sidebar";

export const mapStateToProps = (state) => ({
  inboxTodosCount: inboxTodosCountSelector(state),
  todayTodosCount: todayTodosCountSelector(state),
  nextDaysTodosCount: nextDaysTodosCountSelector(state),
  projectIds: notInboxProjectIdsSelector(state),
  labelIds: labelIdsSelector(state),
  menu: menuSelector(state),
  appData: appDataSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
  logoutUser: () => dispatch(logoutUser()),
  openAddProjectModal: () => dispatch(openAddProjectModal()),
  openAddLabelModal: () => dispatch(openAddLabelModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
