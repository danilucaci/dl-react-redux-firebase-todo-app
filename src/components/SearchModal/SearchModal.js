import React, { useEffect } from "react";
import { func, shape, bool } from "prop-types";
import ReactModal from "react-modal";

import "./SearchModal.styles.scss";

import OutlinedButton from "../OutlinedButton/OutlinedButton";
import MobileSearchBarContainer from "../../redux/containers/components/MobileSearchBarContainer";
import { useDisableBodyBackground } from "../../hooks";

ReactModal.setAppElement("#root");

function SearchModal({
  closeModal,
  modalsState: { searchModalActive = false } = {},
}) {
  const modalRef = useDisableBodyBackground();

  useEffect(() => {
    // Breakpoint at which the gutters change size from 16px to 24px
    // Also where fonts change sizes
    // AKA: $grid-gutter-breakpoint-change: "l";
    const mql = window.matchMedia("(min-width: 42.5rem)");

    function handleMatchMedia(e) {
      if (e.matches) {
        if (searchModalActive) {
          closeModal();
        }
      }
    }

    /**
     *  `addEventListener` doesn’t work in Safari
     */
    mql.addListener(handleMatchMedia);

    return () => {
      mql.removeListener(handleMatchMedia);
    };
  }, [closeModal, searchModalActive]);

  return (
    <ReactModal
      isOpen={searchModalActive}
      contentLabel="Search"
      onRequestClose={closeModal}
      contentRef={modalRef}
      className="SearchModal__Inner"
      overlayClassName="SearchModal__Overlay"
    >
      <div className="SearchModal__TitleRow">
        <h2 className="SearchModal__Title">Search</h2>
        <OutlinedButton
          icon="close"
          iconOnly
          size="m"
          additionalClasses="SearchModal__CloseButton"
          ariaText="Close modal"
          type="button"
          onClick={closeModal}
        />
      </div>
      <MobileSearchBarContainer />
    </ReactModal>
  );
}

SearchModal.propTypes = {
  closeModal: func.isRequired,
  modalsState: shape({
    searchModalActive: bool.isRequired,
  }).isRequired,
};

export default SearchModal;
