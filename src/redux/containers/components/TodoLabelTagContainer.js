import { connect } from "react-redux";
import { labelsSelector } from "../../../redux/labels/labels-selectors";

import TodoLabelTag from "../../../components/TodoLabelTag/TodoLabelTag";

export const mapStateToProps = (state) => ({
  appLabels: labelsSelector(state),
});

export default connect(mapStateToProps)(TodoLabelTag);
