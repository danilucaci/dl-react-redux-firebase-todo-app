import React from "react";
import { node } from "prop-types";
import classnames from "classnames";

import "./Main.styles.scss";
import SidebarContainer from "../../redux/containers/components/SidebarContainer";

function Main({ children }) {
  const mainClasses = classnames({
    Main: true,
    col: true,
    [`col-l-5`]: true,
    [`col-xl-8`]: true,
  });

  return (
    <div className="row row--contain-10">
      <SidebarContainer />
      <main className={mainClasses}>{children}</main>
    </div>
  );
}

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
