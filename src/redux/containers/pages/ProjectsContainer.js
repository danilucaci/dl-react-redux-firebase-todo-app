import { connect } from "react-redux";

import { notInboxProjectIdsSelector } from "../../../redux/projects/projects-selectors";
import { openAddProjectModal } from "../../../redux/localState/localState-actions";

import Projects from "../../../pages/Projects/Projects";

const mapStateToProps = (state) => ({
  projectIds: notInboxProjectIdsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  openAddProjectModal: () => dispatch(openAddProjectModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
