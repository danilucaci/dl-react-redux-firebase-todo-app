import React from "react";
import { Link } from "react-router-dom";
import "./Logo.styles.scss";

import * as ROUTES from "../../constants/routes";

import { ReactComponent as CombinationLogo } from "../../assets/combination-logo.svg";
import { ReactComponent as LogoMark } from "../../assets/logo.svg";

function Logo() {
  return (
    <div className="Logo col">
      <Link to={ROUTES.LANDING} className="Logo__Link">
        <CombinationLogo className="Logo__Combination" />
        <LogoMark className="Logo__Mark" />
      </Link>
    </div>
  );
}

export default Logo;
