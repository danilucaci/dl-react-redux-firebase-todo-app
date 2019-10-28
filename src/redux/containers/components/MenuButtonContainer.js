import { connect } from "react-redux";
import { menuSelector } from "../../../redux/localState/localState-selectors";
import { toggleMenu } from "../../../redux/localState/localState-actions";

import MenuButton from "../../../components/MenuButton/MenuButton";

const mapStateToProps = (state) => ({
  menu: menuSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => dispatch(toggleMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuButton);
