import React from "react";
import { Link } from "react-router-dom";

import "./ProjectsCard.styles.scss";

import * as ROUTES from "../../constants/routes";

function ProjectsCard({
  project: {
    name = "Project",
    color: { colorValue = "" } = {},
    todosCount = 0,
  } = {},
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
      <p className="Project__Card__Count">{todosCount} todos</p>
    </Link>
  );
}

export default ProjectsCard;
