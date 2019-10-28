import { connect } from "react-redux";

import { closeAddTodoModal } from "../../../redux/localState/localState-actions";
import { inboxProjectSelector } from "../../../redux/projects/projects-selectors";
import { addTodo } from "../../../redux/todos/todos-actions";

import AddTodoModal from "../../../components/AddTodoModal/AddTodoModal";

export const mapStateToProps = (state) => ({
  inboxProject: inboxProjectSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeAddTodoModal()),
  addTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTodoModal);
