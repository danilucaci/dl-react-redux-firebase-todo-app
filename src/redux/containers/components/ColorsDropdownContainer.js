import { connect } from "react-redux";

import { colorsSelector } from "../../../redux/colors/colors-selectors";

import ColorsDropdown from "../../../components/ColorsDropdown/ColorsDropdown";

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
});

export default connect(mapStateToProps)(ColorsDropdown);
