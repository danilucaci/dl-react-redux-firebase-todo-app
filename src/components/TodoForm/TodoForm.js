import React, { useState, useRef, useCallback } from "react";
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
import TodoProjectTagContainer from "../../redux/containers/components/TodoProjectTagContainer";
import TodoLabelTagContainer from "../../redux/containers/components/TodoLabelTagContainer";
import { useKeyUpPress, useOnClickOutside, useFocusRef } from "../../hooks";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

import { parseDate } from "../../utils/dates";
import { INBOX_PROJECT_IDENTIFIER } from "../../constants/collections";

function TodoForm({ todo, toggleVisibility, updateTodo }) {
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

  const handleProjectChange = useCallback((project) => {
    const isInboxProject =
      project.hasOwnProperty(INBOX_PROJECT_IDENTIFIER) &&
      project[INBOX_PROJECT_IDENTIFIER];

    setSelectedProject({
      projectID: project.id,
      name: project.name,
      [INBOX_PROJECT_IDENTIFIER]: isInboxProject,
      colorName: project.color.colorName,
      colorValue: project.color.colorValue,
    });

    setShowProjects(false);
  }, []);

  const handleLabelChange = useCallback((labels) => {
    setSelectedLabels(labels);
    setShowLabels(false);
  }, []);

  const handleDateChange = useCallback((date) => {
    setSelectedDate(date);
    setShowDate(false);
  }, []);

  const handleProjectsVisibility = useCallback(() => {
    setShowProjects(true);
    setShowLabels(false);
    setShowDate(false);
  }, []);

  const handleLabelsVisibility = useCallback(() => {
    setShowProjects(false);
    setShowLabels(true);
    setShowDate(false);
  }, []);

  const handleDatesVisibility = useCallback(() => {
    setShowProjects(false);
    setShowLabels(false);
    setShowDate(!showDate);
  }, [showDate]);

  function handleClickOutside() {
    if (showProjects) {
      return setShowProjects(false);
    }
    if (showLabels) {
      return setShowLabels(false);
    }
    if (showDate) {
      /**
       * Don’t close on click outside
       * It is handled by ReactModal’s `onRequestClose` inside the component
       */

      return;
    }
    toggleVisibility();
  }

  function escapeKeyHandler() {
    if (showProjects) {
      return setShowProjects(false);
    }
    if (showLabels) {
      return setShowLabels(false);
    }
    if (showDate) {
      return setShowDate(false);
    }
    toggleVisibility();
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
    toggleVisibility();
  }

  function handleCancelEdit(e) {
    e.preventDefault();
    toggleVisibility();
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
              <TodoProjectTagContainer
                buttonAdditionalClasses="Todo__Form__Project"
                projectName={selectedProject.name}
                projectColorValue={selectedProject.colorValue}
                iconSide="left"
                toggleVisibility={handleProjectsVisibility}
                onChangeHandler={handleProjectChange}
              />
            )}

            <TodoLabelTagContainer
              labels={selectedLabels}
              toggleVisibility={handleLabelsVisibility}
              onChangeHandler={handleLabelChange}
            />

            <TodoDueDate
              dueDate={selectedDate}
              additionalClasses="Todo__Form__DueDate"
              isVisible={showDate}
              toggleVisibility={handleDatesVisibility}
              onChangeHandler={handleDateChange}
            />
          </div>

          <div className="Todo__Form__ButtonsRow">
            <TextButton size="m" onClick={handleCancelEdit} type="button">
              Cancel
            </TextButton>
            <PrimaryButton
              type="submit"
              size="m"
              additionalClasses="Todo__Form__SubmitButton"
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
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
};

TodoForm.defaultProps = {
  todo: {
    labels: null,
    dueDate: null,
  },
};

export default TodoForm;
