import { connect, batch } from "react-redux";

import { appDataSelector } from "../../../redux/localState/localState-selectors";
import {
  setInitialDataLoaded,
  setAppDataErrors,
} from "../../../redux/localState/localState-actions";
import { setColors } from "../../../redux/colors/colors-actions";
import { setTodos } from "../../../redux/todos/todos-actions";
import { setLabels } from "../../../redux/labels/labels-actions";
import { setProjects } from "../../../redux/projects/projects-actions";
import { currentUserSelector } from "../../user/user-selectors";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { projectsSelector } from "../../../redux/projects/projects-selectors";
import { labelsSelector } from "../../../redux/labels/labels-selectors";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
  currentUser: currentUserSelector(state),
  projects: projectsSelector(state),
  labels: labelsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  setColors: (colors) => dispatch(setColors(colors)),
  setTodos: (todos) => dispatch(setTodos(todos)),
  setLabels: (labels) => dispatch(setLabels(labels)),
  setProjects: (projects) => dispatch(setProjects(projects)),
  batch: batch,
  setInitialDataLoaded: () => dispatch(setInitialDataLoaded()),
  setAppDataErrors: (errors) => dispatch(setAppDataErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
