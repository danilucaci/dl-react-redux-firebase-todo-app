import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { arrayOf, object, shape, string, bool, func } from "prop-types";

import "./TodoForm.styles.scss";

import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import { useKeyUpPress, useOnClickOutside, useFocusRef } from "../../hooks";
import TodoDueDate from "../TodoDueDate/TodoDueDate";
import { updateTodo } from "../../redux/todos/todos-actions";

function TodoForm({ todo, isEditingTodo, setIsEditingTodo }) {
  const { id, labels, project, dueDate, name } = todo;

  const [newTodoName, setNewTodoName] = useState(name || "");
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(project);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels);
  const [showDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dueDate);

  const inputRef = useRef();
  const todoWrapperRef = useRef();

  const dispatch = useDispatch();

  function handleClickOutside() {
    if (showProjects) {
      setShowProjects(false);
      return;
    }
    if (showLabels) {
      setShowLabels(false);
      return;
    }
    if (showDate) {
      return;
    }

    toggleIsEditing();
  }

  function escapeKeyHandler() {
    if (showProjects) {
      setShowProjects(false);
      return;
    }
    if (showLabels) {
      setShowLabels(false);
      return;
    }
    if (showDate) {
      setShowDate(false);
      return;
    }

    toggleIsEditing();
  }

  useOnClickOutside(todoWrapperRef, handleClickOutside);
  useFocusRef(inputRef);
  useKeyUpPress("Escape", escapeKeyHandler);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log({ newTodoName });
    console.log({ selectedDate });
    console.log({ selectedProject });
    console.log({ selectedLabels });

    const todoData = {
      ...todo,
      name: newTodoName,
      dueDate: selectedDate,
      project: selectedProject,
      labels: selectedLabels,
    };

    console.log({ todoData });

    dispatch(updateTodo(todoData));
    toggleIsEditing();
  }

  function handleCancelEdit(e) {
    e.preventDefault();
    toggleIsEditing();
  }

  function toggleIsEditing() {
    if (isEditingTodo) {
      setIsEditingTodo(false);
    }
  }

  return (
    <li className="Todo__Form" ref={todoWrapperRef}>
      <form
        method="post"
        className="Todo__Form__FormWrapper"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="Todo__Form__Input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
          ref={inputRef}
        />
        <div className="Todo__Form__ButtonsContainer">
          <div className="Todo__Form__MetaRow">
            {project && (
              <TodoProjectTag
                buttonAdditionalClasses="Todo__Form__Project"
                projectName={selectedProject.name}
                projectColorValue={selectedProject.colorValue}
                iconSide="left"
                onClick={() => setShowProjects(!showProjects)}
                isVisible={showProjects}
                onChangeHandler={(project) =>
                  setSelectedProject({
                    projectID: project.id,
                    name: project.name,
                    colorName: project.color.colorName,
                    colorValue: project.color.colorValue,
                  })
                }
              />
            )}

            <TodoLabelTag
              condensed
              labels={selectedLabels}
              onClick={() => setShowLabels(!showLabels)}
              isVisible={showLabels}
              onChangeHandler={(label) =>
                setSelectedLabels([
                  {
                    colorName: label.color.colorName,
                    colorValue: label.color.colorValue,
                    projectID: label.id,
                    name: label.name,
                  },
                ])
              }
            />

            <TodoDueDate
              dueDate={selectedDate}
              additionalClasses="Todo__Form__DueDate"
              isVisible={showDate}
              onChangeHandler={setSelectedDate}
              onCloseHandler={() => {
                setShowDate(false);
              }}
              onClick={() => {
                if (!showDate) {
                  setShowDate(true);
                }
              }}
            />
          </div>

          <div className="Todo__Form__ButtonsRow">
            <TextButton
              additionalClasses="TextButton--Medium"
              onClick={handleCancelEdit}
              type="button"
            >
              Cancel
            </TextButton>
            <PrimaryButton
              type="submit"
              additionalClasses="Todo__Form__SubmitButton PrimaryButton--Medium"
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </form>
    </li>
  );
}

TodoForm.propTypes = {
  todo: shape({
    labels: arrayOf(
      shape({
        labelID: string,
        name: string,
        colorName: string,
        colorValue: string,
      }),
    ),
    project: shape({
      projectID: string.isRequired,
      name: string.isRequired,
      colorName: string.isRequired,
      colorValue: string.isRequired,
    }).isRequired,
    dueDate: object,
    completed: bool.isRequired,
    name: string.isRequired,
    uid: string.isRequired,
    id: string.isRequired,
  }),
  setIsEditingTodo: func.isRequired,
};

TodoForm.defaultProps = {
  labels: null,
  dueDate: null,
};

export default TodoForm;
