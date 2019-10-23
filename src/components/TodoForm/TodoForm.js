import React, { useState, useRef } from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";

import "./TodoForm.styles.scss";

import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import { useKeyUpPress, useOnClickOutside, useFocusRef } from "../../hooks";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

function TodoForm(props) {
  const {
    labels,
    project,
    dueDate,
    todoLabel,
    isEditingTodo,
    setIsEditingTodo,
  } = props;

  const [todoValue, setTodoValue] = useState(todoLabel || "");
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(project);
  const [showLabels, setShowLabels] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels);

  console.log(selectedLabels);

  const inputRef = useRef();
  const todoWrapperRef = useRef();

  function handleClickOutside() {
    if (showProjects) {
      setShowProjects(false);
      return;
    }
    if (showLabels) {
      setShowLabels(false);
      return;
    }
    toggleIsEditing();
  }

  useOnClickOutside(todoWrapperRef, handleClickOutside);
  useFocusRef(inputRef);

  useKeyUpPress("Escape", toggleIsEditing);

  function handleFormSubmit(e) {
    e.preventDefault();
    toggleIsEditing();
    console.log(e.target);
  }

  function handleCancelEdit(e) {
    e.preventDefault();
    toggleIsEditing();
    console.log(e.target);
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
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
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
              dueDate={dueDate}
              additionalClasses="Todo__Form__DueDate"
              onClick={(e) => e.preventDefault()}
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
              onClick={() => console.log("Submitted with Primary Button")}
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
  todoLabel: string.isRequired,
  setIsEditingTodo: func.isRequired,
  id: string.isRequired,
};

TodoForm.defaultProps = {
  labels: null,
  dueDate: null,
};

export default TodoForm;
