import { connect } from "react-redux";

import { projectSelector } from "../../../redux/projects/projects-selectors";

import ProjectsCard from "../../../components/ProjectsCard/ProjectsCard";

export const mapStateToProps = (state, ownProps) => ({
  project: projectSelector(state, ownProps.projectID),
});

export default connect(mapStateToProps)(ProjectsCard);
