import React from "react";
import { Link } from "react-router-dom";
import "./LabelsCard.styles.scss";

function LabelsCard({
  label: {
    id,
    name = "Label",
    color: { colorValue = "" } = {},
    todosCount = 0,
  } = {},
}) {
  return (
    <>
      <Link
        to={`/label/${name.toLowerCase()}`}
        className="col col-xl-6 Label__Card"
      >
        <div className="Label__Card__Header">
          <h2 className="Label__Card__Title">{name}</h2>
          <svg className="Label__Card__Icon" fill={colorValue}>
            <use xlinkHref="#color" />
          </svg>
        </div>
        <p className="Label__Card__Count">{todosCount} todos</p>
      </Link>
    </>
  );
}

export default LabelsCard;
