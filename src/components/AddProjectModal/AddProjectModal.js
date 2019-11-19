import React, { useState } from "react";
import { array, func, shape, bool } from "prop-types";
import ReactModal from "react-modal";

import "./AddProjectModal.styles.scss";

import OutlinedButton from "../OutlinedButton/OutlinedButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ColorsSelectContainer from "../../redux/containers/components/ColorsSelectContainer";
import TextButton from "../TextButton/TextButton";
import { useDisableBodyBackground, useFocusRef } from "../../hooks";

import Input from "../Input/Input";
import { INBOX_PROJECT_IDENTIFIER } from "../../constants/collections";

ReactModal.setAppElement("#root");

function AddProjectModal({
  colors,
  closeModal,
  addProject,
  modalsState: { addProjectModalActive = false } = {},
}) {
  const inputRef = useFocusRef();

  const [projectName, setProjectName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  const modalRef = useDisableBodyBackground();

  function handleFormSubmit(e) {
    e.preventDefault();

    const newProject = {
      name: projectName,
      [INBOX_PROJECT_IDENTIFIER]: false,
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

  function closeModalHandler() {
    if (colorsVisible) {
      return setColorsVisible(false);
    }

    closeModal();
  }

  return (
    <ReactModal
      isOpen={addProjectModalActive}
      contentLabel="Add a new project"
      onRequestClose={closeModalHandler}
      contentRef={modalRef}
      className="ProjectModal__Inner"
      overlayClassName="ProjectModal__Overlay"
    >
      <div className="ProjectModal__TitleRow">
        <h2 className="ProjectModal__Title">Add a new project</h2>
        <OutlinedButton
          icon="close"
          iconOnly
          size="m"
          additionalClasses="ProjectModal__CloseButton"
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
          <ColorsSelectContainer
            selectedColor={selectedColor}
            onChangeHandler={handleColorSelect}
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
          <PrimaryButton size="m" type="submit" disabled={!projectName.length}>
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
