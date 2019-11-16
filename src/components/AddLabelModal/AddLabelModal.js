import React, { useState } from "react";
import { array, func, shape, bool } from "prop-types";
import ReactModal from "react-modal";

import "./AddLabelModal.styles.scss";

import OutlinedButton from "../OutlinedButton/OutlinedButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ColorsSelectContainer from "../../redux/containers/components/ColorsSelectContainer";
import TextButton from "../TextButton/TextButton";
import { useDisableBodyBackground, useFocusRef } from "../../hooks";

import Input from "../Input/Input";

ReactModal.setAppElement("#root");

function AddLabelModal({
  colors,
  closeModal,
  addLabel,
  modalsState: { addLabelModalActive = false } = {},
}) {
  const inputRef = useFocusRef();

  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  const modalRef = useDisableBodyBackground();

  function handleFormSubmit(e) {
    e.preventDefault();

    const newLabel = {
      name: labelName,
      todosCount: 0,
      color: {
        colorID: selectedColor.id,
        colorName: selectedColor.colorName,
        colorValue: selectedColor.colorValue,
      },
    };

    addLabel(newLabel);
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
      isOpen={addLabelModalActive}
      contentLabel="Add a new label"
      onRequestClose={closeModalHandler}
      contentRef={modalRef}
      className="LabelModal__Inner"
      overlayClassName="LabelModal__Overlay"
    >
      <div className="LabelModal__TitleRow">
        <h2 className="LabelModal__Title">Add a new label</h2>
        <OutlinedButton
          icon="close"
          additionalClasses="LabelModal__CloseButton"
          iconOnly
          size="m"
          ariaText="Close modal"
          type="button"
          onClick={closeModal}
        />
      </div>
      <form
        method="post"
        className="LabelModal__Todo"
        onSubmit={handleFormSubmit}
      >
        <Input
          onChange={(e) => setLabelName(e.target.value)}
          value={labelName}
          placeholder="Label name"
          ref={inputRef}
        />
        <div className="LabelModal__MetaRow">
          <ColorsSelectContainer
            selectedColor={selectedColor}
            onChangeHandler={handleColorSelect}
            toggleVisibility={() => setColorsVisible(!colorsVisible)}
          />
        </div>
        <div className="LabelModal__CTARow">
          <TextButton
            additionalClasses="TextButton--Medium LabelModal__CancelBtn"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </TextButton>
          <PrimaryButton
            additionalClasses="PrimaryButton--Medium"
            type="submit"
            disabled={!labelName.length}
          >
            Add label
          </PrimaryButton>
        </div>
      </form>
    </ReactModal>
  );
}

AddLabelModal.propTypes = {
  colors: array.isRequired,
  closeModal: func.isRequired,
  addLabel: func.isRequired,
  modalsState: shape({
    addLabelModalActive: bool.isRequired,
  }).isRequired,
};

export default AddLabelModal;
