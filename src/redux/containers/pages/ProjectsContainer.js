import { connect } from "react-redux";

import { projectsSelector } from "../../../redux/projects/projects-selectors";
import { openAddProjectModal } from "../../../redux/localState/localState-actions";

import Projects from "../../../pages/Projects/Projects";

const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddProjectModal: () => dispatch(openAddProjectModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
