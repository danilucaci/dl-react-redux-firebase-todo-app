import { connect } from "react-redux";
import { allProjectsSelector } from "../../../redux/projects/projects-selectors";

import ProjectsDropdown from "../../../components/ProjectsDropdown/ProjectsDropdown";

export const mapStateToProps = (state) => ({
  projects: allProjectsSelector(state),
});

export default connect(mapStateToProps)(ProjectsDropdown);
