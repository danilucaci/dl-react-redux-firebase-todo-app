import { connect } from "react-redux";

import { closeAddTodoModal } from "../../../redux/localState/localState-actions";
import { inboxProjectSelector } from "../../../redux/projects/projects-selectors";
import { addTodo } from "../../../redux/todos/todos-actions";
import { modalsSelector } from "../../../redux/localState/localState-selectors";

import AddTodoModal from "../../../components/AddTodoModal/AddTodoModal";

export const mapStateToProps = (state) => ({
  inboxProject: inboxProjectSelector(state),
  modalsState: modalsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    console.log("Close modal");
    return dispatch(closeAddTodoModal());
  },
  addTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTodoModal);
