import React, { useState, useRef } from "react";
import {
  arrayOf,
  shape,
  oneOfType,
  instanceOf,
  string,
  bool,
  func,
} from "prop-types";

import "./TodoForm.styles.scss";

import Input from "../Input/Input";
import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import { useKeyUpPress, useOnClickOutside, useFocusRef } from "../../hooks";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

import { parseDate } from "../../utils/dates";

function TodoForm({ todo, isEditingTodo, setIsEditingTodo, updateTodo }) {
  const { labels, project, dueDate, name } = todo;

  const [newTodoName, setNewTodoName] = useState(name || "");
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(project);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels);
  const [showDate, setShowDate] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    dueDate ? parseDate(dueDate) : null,
  );

  const todoWrapperRef = useRef();

  function handleClickOutside() {
    if (showProjects) {
      setShowProjects(false);
      return;
    }
    if (showLabels) {
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
  const inputRef = useFocusRef();
  useKeyUpPress("Escape", escapeKeyHandler);

  function handleFormSubmit(e) {
    e.preventDefault();

    let newLabels;

    if (Array.isArray(selectedLabels) && selectedLabels.length > 0) {
      newLabels = [...selectedLabels];
    } else {
      newLabels = null;
    }

    const todoData = {
      ...todo,
      name: newTodoName,
      dueDate: selectedDate,
      project: selectedProject,
      labels: newLabels,
    };

    updateTodo(todoData);
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
        <Input
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
              labels={selectedLabels}
              onClick={() => setShowLabels(true)}
              isVisible={showLabels}
              onChangeHandler={setSelectedLabels}
              onCloseHandler={() => setShowLabels(false)}
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
    dueDate: oneOfType([instanceOf(Date), string]),
    completed: bool.isRequired,
    name: string.isRequired,
    uid: string.isRequired,
    id: string.isRequired,
  }),
  setIsEditingTodo: func.isRequired,
};

TodoForm.defaultProps = {
  todo: {
    labels: null,
    dueDate: null,
  },
};

export default TodoForm;
