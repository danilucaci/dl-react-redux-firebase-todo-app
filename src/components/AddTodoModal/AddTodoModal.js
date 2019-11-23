import React, { useEffect, useReducer } from "react";
import { object, bool, func, shape } from "prop-types";
import ReactModal from "react-modal";

import "./AddTodoModal.styles.scss";

import OutlinedButton from "../OutlinedButton/OutlinedButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TextButton from "../TextButton/TextButton";
import { useFocusRef, useDisableBodyBackground } from "../../hooks";

import Input from "../Input/Input";
import TodoProjectTagContainer from "../../redux/containers/components/TodoProjectTagContainer";
import TodoLabelTagContainer from "../../redux/containers/components/TodoLabelTagContainer";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

import {
  addTodoReducerState,
  addTodoReducer,
  setTodoNameAction,
  toggleShowProjectsAction,
  setSelectedProjectAction,
  setInitialSelectedProjectAction,
  toggleShowLabelsAction,
  setSelectedLabelAction,
  toggleShowDateAction,
  setSelectedDateAction,
  setHasNewTimeAction,
} from "./AddTodoLocalReducer";

ReactModal.setAppElement("#root");

function AddTodoModal({
  inboxProject,
  closeModal,
  createTodo,
  modalsState: { addTodoModalActive = false } = {},
}) {
  const inputRef = useFocusRef();

  const [state, dispatch] = useReducer(addTodoReducer, addTodoReducerState);

  const {
    initialSelectedProjectSet = false,
    showDate = false,
    showLabels,
    showProjects,
    todo: { hasNewTime = false } = {},
    todo,
  } = state;

  const setTodoName = (todoName) => dispatch(setTodoNameAction(todoName));
  const toggleShowProjects = () => dispatch(toggleShowProjectsAction());
  const setSelectedProject = (project) =>
    dispatch(setSelectedProjectAction(project));

  const toggleShowLabels = () => dispatch(toggleShowLabelsAction());
  const setSelectedLabel = (labels) => dispatch(setSelectedLabelAction(labels));

  const toggleShowDate = () => dispatch(toggleShowDateAction());
  const setSelectedDate = (date) => dispatch(setSelectedDateAction(date));
  const setHasNewTime = (hasTime) => dispatch(setHasNewTimeAction(hasTime));

  const modalRef = useDisableBodyBackground();

  function closeModalHandler() {
    if (showProjects) {
      return toggleShowProjects();
    }
    if (showLabels) {
      return toggleShowLabels();
    }
    if (showDate) {
      return toggleShowDate();
    }

    closeModal();
  }

  useEffect(() => {
    const setInitialSelectedProject = (project) =>
      dispatch(setInitialSelectedProjectAction(project));

    if (!initialSelectedProjectSet) {
      setInitialSelectedProject(inboxProject);
    }
  }, [dispatch, inboxProject, initialSelectedProjectSet]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const { hasNewTime, ...todoData } = todo || {};

    createTodo(todoData);
    closeModal();
  }

  return (
    <ReactModal
      isOpen={addTodoModalActive}
      contentLabel="Add a new todo"
      onRequestClose={closeModalHandler}
      contentRef={modalRef}
      className="AddTodoModal__Inner"
      overlayClassName="AddTodoModal__Overlay"
    >
      <div className="AddTodoModal__TitleRow">
        <h2 className="AddTodoModal__Title">Add a new todo</h2>
        <OutlinedButton
          icon="close"
          iconOnly
          size="m"
          additionalClasses="AddTodoModal__CloseButton"
          ariaText="Close modal"
          type="button"
          onClick={closeModal}
        />
      </div>
      <form
        method="post"
        className="AddTodoModal__Todo"
        onSubmit={handleFormSubmit}
      >
        <Input
          onChange={(e) => setTodoName(e.target.value)}
          value={todo.name}
          placeholder="Todo name"
          ref={inputRef}
        />
        <div className="AddTodoModal__MetaRow">
          {todo.project ? (
            <TodoProjectTagContainer
              buttonAdditionalClasses="AddTodoModal__Project"
              projectName={todo.project.name}
              projectColorValue={todo.project.colorValue}
              iconSide="left"
              toggleVisibility={toggleShowProjects}
              onChangeHandler={setSelectedProject}
            />
          ) : null}

          <TodoLabelTagContainer
            labels={todo.labels}
            toggleVisibility={toggleShowLabels}
            onChangeHandler={setSelectedLabel}
          />

          <TodoDueDate
            dueDate={todo.dueDate}
            additionalClasses="AddTodoModal__DueDate"
            isVisible={showDate}
            toggleVisibility={toggleShowDate}
            hadPreviousTime={false}
            hasNewTime={hasNewTime}
            setHasNewTime={setHasNewTime}
            fullDateFormat={true}
            bottomFixed={true}
            onChangeHandler={setSelectedDate}
          />
        </div>
        <div className="AddTodoModal__CTARow">
          <TextButton
            additionalClasses="AddTodoModal__CancelBtn"
            size="m"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </TextButton>
          <PrimaryButton size="m" type="submit" disabled={!todo.name.length}>
            Add todo
          </PrimaryButton>
        </div>
      </form>
    </ReactModal>
  );
}

AddTodoModal.propTypes = {
  inboxProject: object.isRequired,
  closeModal: func.isRequired,
  createTodo: func.isRequired,
  modalsState: shape({
    addTodoModalActive: bool.isRequired,
  }).isRequired,
};

export default AddTodoModal;
