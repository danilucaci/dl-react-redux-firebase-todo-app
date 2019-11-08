import React from "react";
import { func, array } from "prop-types";
import "./Labels.styles.scss";

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import AddNew from "../../components/AddNew/AddNew";
import LabelsCardContainer from "../../redux/containers/components/LabelsCardContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Labels({ labels, openAddLabelModal }) {
  return (
    <DashboardMainContainer>
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
    </DashboardMainContainer>
  );
}

Labels.propTypes = {
  labels: array.isRequired,
  openAddLabelModal: func.isRequired,
};

export default withProtectedRoute()(Labels);
