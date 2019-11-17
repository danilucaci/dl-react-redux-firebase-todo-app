import { connect } from "react-redux";

import {
  selectProject,
  projectTodosCountSelector,
} from "../../projects/projects-selectors";
import ProjectSidebarItem from "../../../components/ProjectSidebarItem/ProjectSidebarItem";

export const mapStateToProps = (state, ownProps) => ({
  project: selectProject(state, ownProps.projectID),
  projectTodosCount: projectTodosCountSelector(state, ownProps.projectID),
});

export default connect(mapStateToProps)(ProjectSidebarItem);
