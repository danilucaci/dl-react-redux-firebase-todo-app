import { connect } from "react-redux";
import { labelsSelector } from "../../../redux/labels/labels-selectors";

import LabelsDropdown from "../../../components/LabelsDropdown/LabelsDropdown";

export const mapStateToProps = (state) => ({
  appLabels: labelsSelector(state),
});

export default connect(mapStateToProps)(LabelsDropdown);
