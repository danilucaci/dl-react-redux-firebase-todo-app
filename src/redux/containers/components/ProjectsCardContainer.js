import { connect } from "react-redux";

import {
  projectSelector,
  projectTodosCountSelector,
} from "../../../redux/projects/projects-selectors";

import ProjectsCard from "../../../components/ProjectsCard/ProjectsCard";

export const mapStateToProps = (state, ownProps) => ({
  project: projectSelector(state, ownProps.projectID),
  projectTodosCount: projectTodosCountSelector(state, ownProps.projectID),
});

export default connect(mapStateToProps)(ProjectsCard);
