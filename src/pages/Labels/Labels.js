import React from "react";
import "./Labels.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";
import LabelsCardContainer from "../../redux/containers/components/LabelsCardContainer";

function Labels({ labels, openAddLabelModal }) {
  return (
    <Main>
      <section className="Section">
        <header className="Labels__Section__Header">
          <h1 className="Section__Title">Labels</h1>
          <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
        </header>
        {labels && labels.length ? (
          <div className="row-nested">
            {labels.map((label) => (
              <LabelsCardContainer key={label.id} labelID={label.id} />
            ))}
          </div>
        ) : (
          <p>Add a label to get started</p>
        )}
      </section>
    </Main>
  );
}

export default Labels;
