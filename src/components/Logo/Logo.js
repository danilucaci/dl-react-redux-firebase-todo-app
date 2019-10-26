import React from "react";
import { Link } from "react-router-dom";
import "./Logo.styles.scss";

function Logo() {
  return (
    <Link to="/" className="Logo col col-4 col-l-3 col-xl-4">
      TodoThis
    </Link>
  );
}

export default Logo;
