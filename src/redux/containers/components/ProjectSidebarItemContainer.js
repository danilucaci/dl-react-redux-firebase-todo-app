import { connect } from "react-redux";

import {
  makeProjectSelector,
  makeProjectTodosCountSelector,
} from "../../projects/projects-selectors";
import ProjectSidebarItem from "../../../components/ProjectSidebarItem/ProjectSidebarItem";

export const makeMapStateToProps = () => {
  const projectSelector = makeProjectSelector();
  const projectTodosCountSelector = makeProjectTodosCountSelector();

  return (state, ownProps) => ({
    project: projectSelector(state, ownProps.projectID),
    projectTodosCount: projectTodosCountSelector(state, ownProps.projectID),
  });
};

export default connect(makeMapStateToProps, null, null, { forwardRef: true })(
  ProjectSidebarItem,
);
