import React, { useRef, useState } from "react";
import { array, func, shape, bool } from "prop-types";
import uuid from "uuid";
import ReactModal from "react-modal";

import "./AddLabelModal.styles.scss";

import IconButton from "../IconButton/IconButton";
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
  const modalRef = useRef(null);
  const inputRef = useFocusRef();

  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  useDisableBodyBackground(modalRef);

  function handleFormSubmit(e) {
    e.preventDefault();

    const newLabel = {
      id: uuid.v4(),
      uid: uuid.v4(),
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
      console.log("Closed colors");
      return setColorsVisible(false);
    }

    console.log("Closed all");
    closeModal();
  }

  return (
    <ReactModal
      isOpen={addLabelModalActive}
      contentLabel="Add a new label"
      onRequestClose={closeModalHandler}
      contentRef={(ref) => (modalRef.current = ref)}
      className="LabelModal__Inner"
      overlayClassName="LabelModal__Overlay"
    >
      <div className="LabelModal__TitleRow">
        <h2 className="LabelModal__Title">Add a new label</h2>
        <IconButton
          icon="close"
          additionalClasses="IconButton--Medium LabelModal__CloseButton"
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
