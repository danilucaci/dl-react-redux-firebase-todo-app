import React from "react";
import { node } from "prop-types";
import classnames from "classnames";

import "./AppMain.styles.scss";

function AppMain({ children }) {
  const mainClasses = classnames({
    AppMain: true,
    col: true,
  });

  return (
    <div className="row row--contain-10">
      <main className={mainClasses}>{children}</main>
    </div>
  );
}

AppMain.propTypes = {
  children: node.isRequired,
};

export default AppMain;
