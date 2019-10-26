import React, { useRef, useEffect, useState } from "react";
import { array, func } from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import "./AddLabelModal.styles.scss";

import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import ColorSelect from "../ColorSelect/ColorSelect";
import TextButton from "../TextButton/TextButton";
import {
  useOnClickOutside,
  useDisableModalBackground,
  useKeyUpPress,
} from "../../hooks";

import Portal from "../Portal/Portal";
import Input from "../Input/Input";

import { closeAddLabelModal } from "../../redux/localState/localState-actions";
import { addLabel } from "../../redux/labels/labels-actions";
import { colorsSelector } from "../../redux/colors/colors-selectors";

function AddLabelModal({ colors, closeModal, addLabel }) {
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const [labelName, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [colorsVisible, setColorsVisible] = useState(false);

  useOnClickOutside(modalRef, onCloseHandler);
  useDisableModalBackground(modalRef, labelName);
  useKeyUpPress("Escape", onCloseHandler);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function onCloseHandler() {
    if (colorsVisible) {
      setColorsVisible(!colorsVisible);
      return;
    }

    closeModal();
  }

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

  return (
    <Portal id="add-label-portal">
      <div className="LabelModal__Overlay">
        <div className="LabelModal__Inner" ref={modalRef}>
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
              <ColorSelect
                selectedColor={selectedColor}
                onChangeHandler={setSelectedColor}
                isVisible={colorsVisible}
                toggleIsVisible={() => setColorsVisible(!colorsVisible)}
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
        </div>
      </div>
    </Portal>
  );
}

AddLabelModal.propTypes = {
  colors: array.isRequired,
  closeModal: func.isRequired,
  addLabel: func.isRequired,
};

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeAddLabelModal()),
  addLabel: (label) => dispatch(addLabel(label)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddLabelModal);
