import { connect } from "react-redux";

import { closeAddProjectModal } from "../../../redux/localState/localState-actions";
import { addProject } from "../../../redux/projects/projects-actions";
import { colorsSelector } from "../../../redux/colors/colors-selectors";
import { modalsSelector } from "../../../redux/localState/localState-selectors";

import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal";

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
  modalsState: modalsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeAddProjectModal()),
  addProject: (project) => dispatch(addProject(project)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProjectModal);
