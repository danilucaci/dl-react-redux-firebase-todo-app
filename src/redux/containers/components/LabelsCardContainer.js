import { connect } from "react-redux";

import {
  labelSelector,
  labelTodosCountSelector,
} from "../../../redux/labels/labels-selectors";

import LabelsCard from "../../../components/LabelsCard/LabelsCard";

export const mapStateToProps = (state, ownProps) => ({
  label: labelSelector(state, ownProps.labelID),
  labelTodosCount: labelTodosCountSelector(state, ownProps.labelID),
});

export default connect(mapStateToProps)(LabelsCard);
