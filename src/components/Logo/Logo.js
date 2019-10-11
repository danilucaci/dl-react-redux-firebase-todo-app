import React from "react";
import { Link } from "react-router-dom";
import "./Logo.styles.scss";

function Logo() {
  return (
    <Link to="/" className="Logo">
      TodoThis
    </Link>
  );
}

export default Logo;
