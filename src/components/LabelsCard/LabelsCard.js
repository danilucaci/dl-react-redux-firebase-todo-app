import React from "react";
import { string, number, shape } from "prop-types";
import { Link } from "react-router-dom";
import "./LabelsCard.styles.scss";

import * as ROUTES from "../../constants/routes";

function LabelsCard({
  labelTodosCount = 0,
  label: { name = "Label", color: { colorValue = "" } = {} } = {},
}) {
  return (
    <>
      <Link
        to={`${ROUTES.LABEL}${name.toLowerCase()}`}
        className="col col-xl-6 Label__Card"
      >
        <div className="Label__Card__Header">
          <h2 className="Label__Card__Title">{name}</h2>
          <svg className="Label__Card__Icon" fill={colorValue}>
            <use xlinkHref="#color" />
          </svg>
        </div>
        <p className="Label__Card__Count">{labelTodosCount} todos</p>
      </Link>
    </>
  );
}

LabelsCard.propTypes = {
  labelTodosCount: number.isRequired,
  label: shape({
    name: string.isRequired,
    color: shape({ colorValue: string.isRequired }).isRequired,
  }).isRequired,
};

export default LabelsCard;
