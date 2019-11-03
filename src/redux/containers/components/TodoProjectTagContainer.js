import { connect } from "react-redux";
import { allProjectsSelector } from "../../../redux/projects/projects-selectors";

import TodoProjectTag from "../../../components/TodoProjectTag/TodoProjectTag";

export const mapStateToProps = (state) => ({
  projects: allProjectsSelector(state),
});

export default connect(mapStateToProps)(TodoProjectTag);
