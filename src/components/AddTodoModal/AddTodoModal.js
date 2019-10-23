import React, { useRef, useEffect, useReducer } from "react";
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
  toggleShowLabelsAction,
  closeShowLabelsAction,
  setSelectedLabelAction,
  setShowDateAction,
  closeShowDateAction,
  setSelectedDateAction,
} from "./AddTodoLocalReducer";

function Modal({
  ctaLabel = "Add todo",
  modalTitle = "Add a new todo",
  inboxProject,
  closeModal,
  addTodo,
}) {
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

  const toggleShowLabels = () => dispatch(toggleShowLabelsAction());
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
      closeShowLabels();
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
      <div className="Modal__Overlay">
        <div className="Modal__Inner" ref={modalRef}>
          <div className="Modal__TitleRow">
            <h2 className="Modal__Title">{modalTitle}</h2>
            <IconButton
              icon="close"
              additionalClasses="IconButton--Medium  Modal__CloseButton"
              ariaText="Close modal"
              type="button"
              onClick={closeModal}
            />
          </div>
          <form
            method="post"
            className="Todo__Form__FormWrapper"
            onSubmit={handleFormSubmit}
          >
            <Input
              onChange={(e) => setTodoName(e.target.value)}
              value={todo.name}
              placeholder="Todo name"
              ref={inputRef}
            />
            <div className="Modal__MetaRow">
              {todo.project ? (
                <TodoProjectTag
                  buttonAdditionalClasses="Modal__Project"
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
                onClick={() => toggleShowLabels()}
                isVisible={showLabels}
                onChangeHandler={setSelectedLabel}
              />
              <TodoDueDate
                dueDate={todo.dueDate}
                additionalClasses="Modal__DueDate"
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
            <div className="Modal__CTARow">
              <TextButton
                additionalClasses="TextButton--Medium Modal__CancelBtn"
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
                {ctaLabel}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

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
)(Modal);
