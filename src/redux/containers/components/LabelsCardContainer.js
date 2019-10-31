import { connect } from "react-redux";

import { labelSelector } from "../../../redux/labels/labels-selectors";

import LabelsCard from "../../../components/LabelsCard/LabelsCard";

export const mapStateToProps = (state, ownProps) => ({
  label: labelSelector(state, ownProps.labelID),
});

export default connect(mapStateToProps)(LabelsCard);
