import { connect } from "react-redux";

import {
  projectOverdueTodosSelector,
  projectNotOverdueTodosSelector,
  projectSelector,
} from "../../../redux/projects/projects-selectors";

import Project from "../../../pages/Project/Project";

const mapStateToProps = (state, ownProps) => ({
  projectOverdueTodos: projectOverdueTodosSelector(state, ownProps.projectID),
  projectTodos: projectNotOverdueTodosSelector(state, ownProps.projectID),
  project: projectSelector(state, ownProps.projectID),
});

export default connect(mapStateToProps)(Project);
