import { connect } from "react-redux";

import {
  makeLabelSelector,
  makeLabelTodosCountSelector,
} from "../../labels/labels-selectors";
import LabelSidebarItem from "../../../components/LabelSidebarItem/LabelSidebarItem";

export const makeMapStateToProps = () => {
  const labelSelector = makeLabelSelector();
  const labelTodosCountSelector = makeLabelTodosCountSelector();

  return (state, ownProps) => ({
    label: labelSelector(state, ownProps.labelID),
    labelTodosCount: labelTodosCountSelector(state, ownProps.labelID),
  });
};

export default connect(makeMapStateToProps)(LabelSidebarItem);
