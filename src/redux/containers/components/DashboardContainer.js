import { connect } from "react-redux";

import { setInitialDataLoaded } from "../../../redux/localState/localState-actions";
import { subscribeToColors } from "../../../redux/colors/colors-actions";
import { subscribeToTodos } from "../../../redux/todos/todos-actions";
import { subscribeToLabels } from "../../../redux/labels/labels-actions";
import { subscribeToProjects } from "../../../redux/projects/projects-actions";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { projectsSelector } from "../../../redux/projects/projects-selectors";
import { labelsSelector } from "../../../redux/labels/labels-selectors";
import { userStateSelector } from "../../user/user-selectors";
import { appDataSelector } from "../../../redux/localState/localState-selectors";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
  userState: userStateSelector(state),
  projects: projectsSelector(state),
  labels: labelsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  setInitialDataLoaded: () => dispatch(setInitialDataLoaded()),
  subscribeToColors: () => dispatch(subscribeToColors()),
  subscribeToTodos: () => dispatch(subscribeToTodos()),
  subscribeToLabels: () => dispatch(subscribeToLabels()),
  subscribeToProjects: () => dispatch(subscribeToProjects()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
