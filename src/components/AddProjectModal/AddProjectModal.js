import React, { useRef, useState } from "react";
import { array, func } from "prop-types";
import uuid from "uuid";

import "./AddProjectModal.styles.scss";

import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ColorSelect from "../ColorSelect/ColorSelect";
import TextButton from "../TextButton/TextButton";
import {
  useOnClickOutside,
  useDisableModalBackground,
  useKeyUpPress,
  useFocusRef,
} from "../../hooks";

import Portal from "../Portal/Portal";
import Input from "../Input/Input";

function AddProjectModal({ colors, closeModal, addProject }) {
  const modalRef = useRef(null);
  const inputRef = useFocusRef();

  const [projectName, setProjectName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  useOnClickOutside(modalRef, onCloseHandler);
  useDisableModalBackground(modalRef, projectName);
  useKeyUpPress("Escape", onCloseHandler);

  function onCloseHandler() {
    if (colorsVisible) {
      setColorsVisible(!colorsVisible);
      return;
    }

    closeModal();
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newProject = {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: projectName,
      todosCount: 0,
      color: {
        colorID: selectedColor.id,
        colorName: selectedColor.colorName,
        colorValue: selectedColor.colorValue,
      },
    };

    addProject(newProject);
    closeModal();
  }

  return (
    <Portal id="add-project-portal">
      <div className="ProjectModal__Overlay">
        <div className="ProjectModal__Inner" ref={modalRef}>
          <div className="ProjectModal__TitleRow">
            <h2 className="ProjectModal__Title">Add a new project</h2>
            <IconButton
              icon="close"
              additionalClasses="IconButton--Medium ProjectModal__CloseButton"
              ariaText="Close modal"
              type="button"
              onClick={closeModal}
            />
          </div>
          <form
            method="post"
            className="ProjectModal__Todo"
            onSubmit={handleFormSubmit}
          >
            <Input
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
              placeholder="Project name"
              ref={inputRef}
            />
            <div className="ProjectModal__MetaRow">
              <ColorSelect
                selectedColor={selectedColor}
                onChangeHandler={setSelectedColor}
                isVisible={colorsVisible}
                toggleIsVisible={() => setColorsVisible(!colorsVisible)}
              />
            </div>
            <div className="ProjectModal__CTARow">
              <TextButton
                additionalClasses="TextButton--Medium ProjectModal__CancelBtn"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </TextButton>
              <PrimaryButton
                additionalClasses="PrimaryButton--Medium"
                type="submit"
                disabled={!projectName.length}
              >
                Add project
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}

AddProjectModal.propTypes = {
  colors: array.isRequired,
  closeModal: func.isRequired,
  addProject: func.isRequired,
};

export default AddProjectModal;
