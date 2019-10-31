import { connect } from "react-redux";

import { selectLabel } from "../../labels/labels-selectors";
import LabelSidebarItem from "../../../components/LabelSidebarItem/LabelSidebarItem";

export const mapStateToProps = (state, ownProps) => ({
  label: selectLabel(state, ownProps.labelID),
});

export default connect(mapStateToProps)(LabelSidebarItem);
