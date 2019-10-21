import React, { useRef, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import "./AddTodoModal.styles.scss";

import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TextButton from "../TextButton/TextButton";
import {
  useOnClickOutside,
  useDisableModalBackground,
  useKeyUpPress,
} from "../../hooks";

import Portal from "../Portal/Portal";
import Input from "../Input/Input";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import TodoDueDate from "../TodoDueDate/TodoDueDate";
import { closeAddTodoModal } from "../../redux/localState/localState-actions";
import {
  inboxProjectSelector,
  projectsSelector,
} from "../../redux/projects/projects-selectors";
import { labelsSelector } from "../../redux/labels/labels-selectors";

function Modal({
  ctaLabel = "Add todo",
  modalTitle = "Add a new todo",
  inboxProject,
  projects,
  labels,
}) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const [todoName, setTodoName] = useState("");
  const [selectedProject, setSelectedProject] = useState(inboxProject);
  const [selectedLabels, setSelectedLabels] = useState(null);
  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const dispatch = useDispatch();

  const closeModal = () => dispatch(closeAddTodoModal());

  useOnClickOutside(modalRef, closeModal);
  useDisableModalBackground(modalRef);
  useKeyUpPress("Escape", closeModal);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
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
              value={todoName}
              placeholder="Todo name"
              ref={inputRef}
            />
            <div className="Modal__MetaRow">
              {selectedProject ? (
                <TodoProjectTag
                  buttonAdditionalClasses="Modal__Project"
                  projectName={selectedProject.name}
                  projectColorValue={selectedProject.color.colorValue}
                  iconSide="left"
                  onClick={(e) => e.preventDefault()}
                />
              ) : null}

              <TodoLabelTag
                labels={selectedLabels}
                onClick={(e) => e.preventDefault()}
              />

              <TodoDueDate
                dueDate={selectedDueDate}
                additionalClasses="Modal__DueDate"
                onClick={(e) => e.preventDefault()}
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
                onClick={() => console.log("Submitted with Primary Button")}
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
  projects: projectsSelector(state),
  labels: labelsSelector(state),
});

export default connect(mapStateToProps)(Modal);
