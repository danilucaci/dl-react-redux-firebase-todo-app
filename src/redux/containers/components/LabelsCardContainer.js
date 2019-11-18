import { connect } from "react-redux";

import {
  makeLabelSelector,
  makeLabelTodosCountSelector,
} from "../../../redux/labels/labels-selectors";

import LabelsCard from "../../../components/LabelsCard/LabelsCard";

export const makeMapStateToProps = () => {
  const labelSelector = makeLabelSelector();
  const labelTodosCountSelector = makeLabelTodosCountSelector();

  return (state, ownProps) => ({
    label: labelSelector(state, ownProps.labelID),
    labelTodosCount: labelTodosCountSelector(state, ownProps.labelID),
  });
};

export default connect(makeMapStateToProps)(LabelsCard);
