import { connect } from "react-redux";
import { appDataSelector } from "../../../redux/localState/localState-selectors";

import Main from "../../../components/Main/Main";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export default connect(mapStateToProps)(Main);
