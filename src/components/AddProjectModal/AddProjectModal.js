import React, { useRef, useState } from "react";
import { array, func, shape, bool } from "prop-types";
import uuid from "uuid";
import ReactModal from "react-modal";

import "./AddProjectModal.styles.scss";

import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ColorSelect from "../ColorSelect/ColorSelect";
import TextButton from "../TextButton/TextButton";
import { useDisableBodyBackground, useFocusRef } from "../../hooks";

import Input from "../Input/Input";

ReactModal.setAppElement("#root");

function AddProjectModal({
  colors,
  closeModal,
  addProject,
  modalsState: { addProjectModalActive = false } = {},
}) {
  const modalRef = useRef(null);
  const inputRef = useFocusRef();

  const [projectName, setProjectName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  useDisableBodyBackground(modalRef);

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

  function handleColorSelect(color) {
    setSelectedColor(color);
    setColorsVisible(false);
  }

  return (
    <ReactModal
      isOpen={addProjectModalActive}
      contentLabel="Add a new project"
      onRequestClose={closeModal}
      contentRef={(ref) => (modalRef.current = ref)}
      className="ProjectModal__Inner"
      overlayClassName="ProjectModal__Overlay"
    >
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
            onChangeHandler={handleColorSelect}
            isVisible={colorsVisible}
            toggleVisibility={() => setColorsVisible(!colorsVisible)}
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
    </ReactModal>
  );
}

AddProjectModal.propTypes = {
  colors: array.isRequired,
  closeModal: func.isRequired,
  addProject: func.isRequired,
  modalsState: shape({
    addProjectModalActive: bool.isRequired,
  }).isRequired,
};

export default AddProjectModal;
