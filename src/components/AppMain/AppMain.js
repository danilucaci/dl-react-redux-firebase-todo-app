import React from "react";
import { node } from "prop-types";
import classnames from "classnames";

import "./AppMain.styles.scss";

function AppMain({ children }) {
  const mainClasses = classnames({
    AppMain: true,
  });

  return <main className={mainClasses}>{children}</main>;
}

AppMain.propTypes = {
  children: node.isRequired,
};

export default AppMain;
