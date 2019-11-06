import { connect, batch } from "react-redux";

import { projectsSelector } from "../../../redux/projects/projects-selectors";
import { labelsSelector } from "../../../redux/labels/labels-selectors";
import { currentUserSelector } from "../../../redux/user/user-selectors";
import { modalsSelector } from "../../../redux/localState/localState-selectors";
import { menuSelector } from "../../../redux/localState/localState-selectors";
import { closeMenu } from "../../../redux/localState/localState-actions";
import { setColors } from "../../../redux/colors/colors-actions";
import { setTodos } from "../../../redux/todos/todos-actions";
import { setLabels } from "../../../redux/labels/labels-actions";
import { setProjects } from "../../../redux/projects/projects-actions";

import App from "../../../App";

export const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
  labels: labelsSelector(state),
  currentUser: currentUserSelector(state),
  modalsState: modalsSelector(state),
  menu: menuSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
  setColors: (colors) => dispatch(setColors(colors)),
  setTodos: (todos) => dispatch(setTodos(todos)),
  setLabels: (labels) => dispatch(setLabels(labels)),
  setProjects: (projects) => dispatch(setProjects(projects)),
  batch: batch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
