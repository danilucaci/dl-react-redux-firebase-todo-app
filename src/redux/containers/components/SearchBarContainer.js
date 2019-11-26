import { connect } from "react-redux";
import { toggleTodoHighlight } from "../../todos/todos-actions";

import SearchBar from "../../../components/SearchBar/SearchBar";
import { appDataSelector } from "../../localState/localState-selectors";

export const mapStateToProps = (state) => ({
  appData: appDataSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  toggleTodoHighlight: (todoID) => dispatch(toggleTodoHighlight(todoID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
