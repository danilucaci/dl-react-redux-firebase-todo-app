import React from "react";
import { string, number, shape } from "prop-types";
import { Link } from "react-router-dom";

import "./ProjectsCard.styles.scss";

import * as ROUTES from "../../constants/routes";

function ProjectsCard({
  projectTodosCount = 0,
  project: { name = "Project", color: { colorValue = "" } = {} } = {},
}) {
  return (
    <Link
      to={`${ROUTES.PROJECT}${name.toLowerCase()}`}
      className="col col-xl-6 Project__Card"
    >
      <div className="Project__Card__Header">
        <h2 className="Project__Card__Title">{name}</h2>
        <svg className="Project__Card__Icon" fill={colorValue}>
          <use xlinkHref="#color" />
        </svg>
      </div>
      <p className="Project__Card__Count">{projectTodosCount} todos</p>
    </Link>
  );
}

ProjectsCard.propTypes = {
  projectTodosCount: number.isRequired,
  project: shape({
    name: string.isRequired,
    color: shape({ colorValue: string.isRequired }).isRequired,
  }).isRequired,
};

export default ProjectsCard;
