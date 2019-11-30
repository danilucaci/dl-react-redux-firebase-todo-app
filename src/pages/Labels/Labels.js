import React from "react";
import { func, array } from "prop-types";
import "./Labels.styles.scss";

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import AddNew from "../../components/AddNew/AddNew";
import LabelsCardContainer from "../../redux/containers/components/LabelsCardContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Labels({ labelIds, openAddLabelModal }) {
  return (
    <DashboardMainContainer>
      <section className="Section" aria-labelledby="labels">
        <header className="Labels__Section__Header">
          <h1 className="Section__Title" id="labels">
            Labels
          </h1>
          <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
        </header>
        {labelIds && labelIds.length ? (
          <div className="row-nested">
            {labelIds.map((labelId) => (
              <LabelsCardContainer key={labelId} labelID={labelId} />
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
  labelIds: array.isRequired,
  openAddLabelModal: func.isRequired,
};

export default withProtectedRoute()(Labels);
