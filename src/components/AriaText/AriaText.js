import React from "react";
import { node } from "prop-types";

import "./AriaText.styles.scss";

const AriaText = ({ children }) => <span className="AriaText">{children}</span>;

AriaText.propTypes = {
  children: node.isRequired,
};

export default AriaText;
