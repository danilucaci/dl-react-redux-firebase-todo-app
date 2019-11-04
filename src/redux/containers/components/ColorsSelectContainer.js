import { connect } from "react-redux";

import { colorsSelector } from "../../../redux/colors/colors-selectors";

import ColorSelect from "../../../components/ColorSelect/ColorSelect";

export const mapStateToProps = (state) => ({
  colors: colorsSelector(state),
});

export default connect(mapStateToProps)(ColorSelect);
