import React from "react";
import { Link } from "react-router-dom";
import "./Logo.styles.scss";

import * as ROUTES from "../../constants/routes";

function Logo() {
  return (
    <Link to={ROUTES.LANDING} className="Logo col col-4 col-l-3 col-xl-4">
      TodoThis
    </Link>
  );
}

export default Logo;
