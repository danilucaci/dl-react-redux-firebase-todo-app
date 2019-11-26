import { connect } from "react-redux";
import { toggleTodoHighlight } from "../../todos/todos-actions";

import MobileSearchBar from "../../../components/MobileSearchBar/MobileSearchBar";
import { appDataSelector } from "../../localState/localState-selectors";
import { closeSearchModal } from "../../localState/localState-actions";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  toggleTodoHighlight: (todoID) => dispatch(toggleTodoHighlight(todoID)),
  closeSearchModal: () => dispatch(closeSearchModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileSearchBar);
