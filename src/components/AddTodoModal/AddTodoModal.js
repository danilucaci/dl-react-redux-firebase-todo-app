import React, { useRef, useEffect, useReducer } from "react";
import { object, func } from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import "./AddTodoModal.styles.scss";

import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TextButton from "../TextButton/TextButton";
import {
  useOnClickOutside,
  useDisableModalBackground,
  useKeyUpPress,
  // useLogger,
} from "../../hooks";

import Portal from "../Portal/Portal";
import Input from "../Input/Input";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import TodoDueDate from "../TodoDueDate/TodoDueDate";
import { closeAddTodoModal } from "../../redux/localState/localState-actions";
import { inboxProjectSelector } from "../../redux/projects/projects-selectors";
import { addTodo } from "../../redux/todos/todos-actions";

import {
  addTodoReducerState,
  addTodoReducer,
  setTodoNameAction,
  toggleShowProjectsAction,
  closeShowProjectsAction,
  setSelectedProjectAction,
  setInitialSelectedProjectAction,
  setShowLabelsAction,
  closeShowLabelsAction,
  setSelectedLabelAction,
  setShowDateAction,
  closeShowDateAction,
  setSelectedDateAction,
} from "./AddTodoLocalReducer";

function AddTodoModal({ inboxProject, closeModal, addTodo }) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const [state, dispatch] = useReducer(addTodoReducer, addTodoReducerState);
  // const [state, dispatch] = useLogger(
  //   useReducer(addTodoReducer, addTodoReducerState),
  // );

  const {
    showProjects,
    initialSelectedProjectSet,
    showLabels,
    showDate,
    todo,
  } = state;

  const setTodoName = (todoName) => dispatch(setTodoNameAction(todoName));
  const toggleShowProjects = () => dispatch(toggleShowProjectsAction());
  const closeShowProjects = () => dispatch(closeShowProjectsAction());

  const setSelectedProject = (project) =>
    dispatch(setSelectedProjectAction(project));

  const setShowLabels = () => dispatch(setShowLabelsAction());
  const closeShowLabels = () => dispatch(closeShowLabelsAction());
  const setSelectedLabel = (labels) => dispatch(setSelectedLabelAction(labels));

  const setShowDate = () => dispatch(setShowDateAction());
  const closeShowDate = () => dispatch(closeShowDateAction());
  const setSelectedDate = (date) => dispatch(setSelectedDateAction(date));

  useOnClickOutside(modalRef, handleClickOutside);
  useDisableModalBackground(modalRef);
  useKeyUpPress("Escape", escapeKeyHandler);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const setInitialSelectedProject = (project) =>
      dispatch(setInitialSelectedProjectAction(project));

    if (!initialSelectedProjectSet) {
      setInitialSelectedProject(inboxProject);
    }
  }, [dispatch, inboxProject, initialSelectedProjectSet]);

  function handleClickOutside() {
    if (showProjects) {
      closeShowProjects();
      return;
    }
    if (showLabels) {
      return;
    }
    if (showDate) {
      return;
    }

    closeModal();
  }

  function escapeKeyHandler() {
    if (showProjects) {
      closeShowProjects();
      return;
    }
    if (showLabels) {
      closeShowLabels();
      return;
    }
    if (showDate) {
      closeShowDate();
      return;
    }

    closeModal();
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: uuid.v4(),
      uid: uuid.v4(),
      ...state.todo,
    };

    addTodo(newTodo);
    closeModal();
  }

  return (
    <Portal id="add-todo-portal">
      <div className="AddTodoModal__Overlay">
        <div className="AddTodoModal__Inner" ref={modalRef}>
          <div className="AddTodoModal__TitleRow">
            <h2 className="AddTodoModal__Title">Add a new todo</h2>
            <IconButton
              icon="close"
              additionalClasses="IconButton--Medium  AddTodoModal__CloseButton"
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
                <TodoProjectTag
                  buttonAdditionalClasses="AddTodoModal__Project"
                  projectName={todo.project.name}
                  projectColorValue={todo.project.colorValue}
                  iconSide="left"
                  onClick={() => toggleShowProjects()}
                  isVisible={showProjects}
                  onChangeHandler={setSelectedProject}
                />
              ) : null}

              <TodoLabelTag
                labels={todo.labels}
                onClick={() => setShowLabels()}
                isVisible={showLabels}
                onChangeHandler={setSelectedLabel}
                onCloseHandler={() => closeShowLabels()}
              />

              <TodoDueDate
                dueDate={todo.dueDate}
                additionalClasses="AddTodoModal__DueDate"
                isVisible={showDate}
                onChangeHandler={setSelectedDate}
                onCloseHandler={() => {
                  closeShowDate();
                }}
                onClick={() => {
                  if (!showDate) {
                    setShowDate();
                  }
                }}
              />
            </div>
            <div className="AddTodoModal__CTARow">
              <TextButton
                additionalClasses="TextButton--Medium AddTodoModal__CancelBtn"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </TextButton>
              <PrimaryButton
                additionalClasses="PrimaryButton--Medium"
                type="submit"
                disabled={!todo.name.length}
              >
                Add todo
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

AddTodoModal.propTypes = {
  inboxProject: object.isRequired,
  closeModal: func.isRequired,
  addTodo: func.isRequired,
};

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
