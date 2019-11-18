import { connect } from "react-redux";

import {
  makeProjectOverdueTodosSelector,
  makeProjectNotOverdueTodosSelector,
  makeProjectSelector,
} from "../../../redux/projects/projects-selectors";
import { openAddTodoModal } from "../../../redux/localState/localState-actions";

import Project from "../../../pages/Project/Project";

const makeMapStateToProps = () => {
  const projectOverdueTodosSelector = makeProjectOverdueTodosSelector();
  const projectNotOverdueTodosSelector = makeProjectNotOverdueTodosSelector();
  const projectSelector = makeProjectSelector();

  return (state, ownProps) => ({
    projectOverdueTodos: projectOverdueTodosSelector(state, ownProps.projectID),
    projectTodos: projectNotOverdueTodosSelector(state, ownProps.projectID),
    project: projectSelector(state, ownProps.projectID),
  });
};

export const mapDispatchToProps = (dispatch) => ({
  openAddTodoModal: () => dispatch(openAddTodoModal()),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(Project);
