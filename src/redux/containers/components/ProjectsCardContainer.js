import { connect } from "react-redux";

import {
  makeProjectSelector,
  makeProjectTodosCountSelector,
} from "../../../redux/projects/projects-selectors";

import ProjectsCard from "../../../components/ProjectsCard/ProjectsCard";

export const makeMapStateToProps = () => {
  const projectSelector = makeProjectSelector();
  const projectTodosCountSelector = makeProjectTodosCountSelector();

  return (state, ownProps) => ({
    project: projectSelector(state, ownProps.projectID),
    projectTodosCount: projectTodosCountSelector(state, ownProps.projectID),
  });
};

export default connect(makeMapStateToProps)(ProjectsCard);
