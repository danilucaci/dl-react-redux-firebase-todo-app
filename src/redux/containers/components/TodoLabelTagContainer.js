import { connect } from "react-redux";
import { allLabelsSelector } from "../../../redux/labels/labels-selectors";

import TodoLabelTag from "../../../components/TodoLabelTag/TodoLabelTag";

export const mapStateToProps = (state) => ({
  appLabels: allLabelsSelector(state),
});

export default connect(mapStateToProps)(TodoLabelTag);
